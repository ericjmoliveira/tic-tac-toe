const playSpaces = document.querySelectorAll('.playspace');

let turnPlayer = 'X';

for (let i = 0; i < playSpaces.length; i++) {
    playSpaces[i].addEventListener('click', function () {
        if (playSpaces[i].textContent === '') {
            if (turnPlayer === 'X') {
                playSpaces[i].textContent = 'X';
                turnPlayer = 'O';
            } else {
                playSpaces[i].textContent = 'O';
                turnPlayer = 'X';
            }
        }        
    });
}

