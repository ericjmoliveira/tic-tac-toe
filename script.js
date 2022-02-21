const playSpaces = document.querySelectorAll('.playspace');
const newGameButton = document.querySelector('.new-game-btn');
const infoBoard = document.querySelector('.info-board');

let turnPlayer = 'X';
let isGameOver = false;
let playsLog = [];
let playsCount = 0;

const winningPlays = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

infoBoard.textContent = 'X PLAYER TURN'

newGameButton.addEventListener('click', startNewGame);

for (let i = 0; i < playSpaces.length; i++) {

    playSpaces[i].addEventListener('click', function () {
        if (isGameOver) return;

        if (playSpaces[i].textContent === '') {
            playSpaces[i].classList.add('not-allowed');
            if (turnPlayer === 'X') {
                playSpaces[i].textContent = 'X';
                playsLog[i] = 'X';
            } else {
                playSpaces[i].textContent = 'O';
                playsLog[i] = 'O';
            }
            
            playsCount++;

            let winPlay = checkWinningPlay(turnPlayer);
                if (winPlay) {
                    highlightBoard(winPlay);
                    isGameOver = true;
                    return;
                }
            
            if(checkForDraw()) return;
            swapTurn();
        };
    });
}

function checkWinningPlay(gameSymbol) {
    for (let i = 0; i < winningPlays.length; i++) {
        if (playsLog[winningPlays[i][0]] == gameSymbol &&
            playsLog[winningPlays[i][1]] == gameSymbol &&
            playsLog[winningPlays[i][2]] == gameSymbol) {
            infoBoard.textContent = `${gameSymbol} PLAYER WON!`;
            isGameOver = true;
            
            return winningPlays[i];
        }
    }
}

function startNewGame() {
    for (let i = 0; i < playsLog.length; i++) {
        playSpaces[i].textContent = '';
        
        playSpaces[i].classList.remove('highlight-play');
        playSpaces[i].classList.remove('not-allowed');
        
        playsLog[i] = '';
        playsCount = 0;
        isGameOver = false;
    }

    isGameOver = false;
    turnPlayer = 'X';
    infoBoard.textContent = 'X PLAYER TURN'
}

function swapTurn() {
    if (turnPlayer === 'X') turnPlayer = 'O'
    else turnPlayer = 'X';
    infoBoard.textContent = `${turnPlayer} PLAYER TURN`;
}

function highlightBoard(winPlaySpaces) {
    for (let i = 0; i < winPlaySpaces.length; i++) {
        playSpaces[winPlaySpaces[i]].classList.add('highlight-play');
    }
}

function checkForDraw() {
    if (playsCount === 9 && !isGameOver) {
        infoBoard.textContent = 'DRAW';
        isGameOver = true;
        
        return true;
    }
}