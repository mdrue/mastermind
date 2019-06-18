const boardTokens = document.querySelectorAll('.board.token');

const playerTokens = document.querySelectorAll('.player.token');

const board = document.querySelector('#game-board');

const boardRow = document.querySelectorAll('.board-row');

board.addEventListener('click', function(event) {
    let target = event.target;

    for (token of boardTokens) {
        if (target === token) {
            target.setAttribute('data-selected', 'true')
        }
    }

});



