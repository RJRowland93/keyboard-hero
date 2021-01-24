import { KEYS } from './constants'

const SCORE = document.getElementById('score');
const TIMER = document.getElementById('timer');
const MESSAGE = document.getElementById('message');
const KEYSBAR = document.getElementById('keys');

function Key(letter, shouldPlay) {
    const element = document.createElement('div');
    element.innerHTML = letter;
    element.className = "key";
    if (shouldPlay) {
        element.style.backgroundColor = 'green';
    }
    return element;
}

function KeyRow(play, ) {
    const element = document.createElement('div');
    element.className = "key-row";
    KEYS.forEach((k, i) => {
        const key = Key(k, play[i], )
        element.appendChild(key)
    });
    return element;
}

function GameOverMessage() {
    const container = document.createElement('div');
    container.className="game-over-message";
    const x = document.createElement('p')
    x.innerHTML = "FUCK YOU, GAME OVER!"
    const y = document.createElement('p')
    y.innerHTML = SCORE.innerText;
    const z = document.createElement('p')
    z.innerHTML = "Press ENTER to play again."
    
    container.appendChild(x)
    container.appendChild(y)
    container.appendChild(z)
    
    return container;
}

function render({score, time, plays }) {
    SCORE.innerHTML = `Score: ${score}`
    TIMER.innerHTML = `Time remaining: ${time}`;
    MESSAGE.innerHTML = "";
    KEYSBAR.innerHTML = "";
    plays.forEach((play, i) => {
        const row = KeyRow(play, );
        KEYSBAR.appendChild(row)
    })
}

function renderIntro() {
   KEYSBAR.innerHTML = "<p>Press ENTER to start game.</p>";
}

function clearScreen() {
    MESSAGE.innerHTML = "";
}

function renderGameOver() {
    MESSAGE.append(GameOverMessage())
}

export {clearScreen, renderIntro, render, renderGameOver } 