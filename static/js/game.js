const boardToken = document.querySelectorAll('.board.token');

const playerToken = document.querySelectorAll('.player.token');

const board = document.querySelector('#game-board');

const boardRow = document.querySelectorAll('.board-row');

board.addEventListener('click', function(event) {
    let target = event.target;

    for (row of boardRow) {
        if (target === row) {
            return;
        }
    }

    target.setAttribute('data-selected', 'true')
});



