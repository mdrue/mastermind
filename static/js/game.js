const board = document.querySelector('#game-board');

const boardRow = document.querySelectorAll('.board-row');

const selectableColors = document.querySelector('#selectable-colors');

let selectedColor;

var playerSteps = [];

let generate

board.addEventListener('click', function(event) {
    let target = event.target;

    let playerStep = {'selectedColor': 0,
                        'row': 0,
                        'token': 0};

    if (target.getAttribute('class') === 'board token') {
        target.classList.add(selectedColor);
        playerStep['selectedColor'] = selectedColor;
        playerStep['row'] = target.dataset.row;
        playerStep['token'] = target.dataset['token'];
        playerSteps.push(playerStep);
    }
});

selectableColors.addEventListener('click', function(event){
    let target = event.target;

    if (target.getAttribute('class') === 'player token'){
        selectedColor = target.getAttribute('id');
    }
});


