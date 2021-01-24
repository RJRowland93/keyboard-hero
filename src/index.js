import { merge, fromEvent, interval } from 'rxjs'
import {pluck, scan, map, filter, takeWhile } from 'rxjs/operators'

import {clearScreen, render, renderGameOver, renderIntro} from './renderer'
import { KEYS, NUM_KEYS, TIME_SECONDS} from './constants'

let IN_PROGRESS = false;

function generateNextPlay() {
    const x = Array(NUM_KEYS).fill(null);
    const r = Math.floor(Math.random() * x.length);
    x[r] = true;
    return x;
}

function initPlays(n) {
    const x = Array(n);
    for (let i = 0; i < n; i++) {
       x[i] = generateNextPlay(); 
    }
    return x
}

const INITIAL_STATE = {
    score: 0,
    gameOver: false,
    missed: null,
    plays: initPlays(7),
    time: TIME_SECONDS,
};

const pressed$ = fromEvent(document, 'keypress')
    .pipe(pluck('key'));

const keys$ = pressed$.pipe(
        filter(key => KEYS.includes(key)),
        map(key => KEYS.findIndex(c => c == key)),
        map(i => ({play: i}))
    );

const timer$ = interval(1000).pipe(
    map(i => ({time: i + 1})),
);

const game$ = merge(keys$, timer$).pipe(
    scan((state, {play, time}) => {
        if (time) {
            return { ...state, time: TIME_SECONDS - time}
        } 

        const [current, ...upcoming] = state.plays;
        if (!current[play]) {
           return {...state, gameOver: true, missed: play} 
        }
            
        return {
            ...state,
            score: state.score + 1, 
            plays: [...upcoming, generateNextPlay()],
        }
    }, INITIAL_STATE),
    takeWhile(state => state.time > 0 && !state.gameOver)
)

function start() {
    render(INITIAL_STATE);
    game$.subscribe(
        render,
        console.error,
        () => {
            IN_PROGRESS = false;
            renderGameOver()
        }
    );
}

(function init() {
    renderIntro()
    const play$ = pressed$.pipe(
        filter(key => key === 'Enter')
    ).subscribe(()=>{
        if (!IN_PROGRESS) {
            IN_PROGRESS = true;
            clearScreen();
            start()
        }
    });
})()
