const board = document.querySelector('#game-board');

const boardRow = document.querySelectorAll('.board-row');

const selectableColors = document.querySelector('#selectable-colors');

let selectedColor;

var playerSteps = [];

let generate;

let actualRow = 1;

board.addEventListener('click', function(event) {
    let target = event.target;

    let playerStep = {'selectedColor': 0,
                        'row': 0,
                        'token': 0};

    actualRow = Math.floor(playerSteps.length / 4) + 1;
    let row = document.querySelector(`#row-${actualRow}`);
    console.log(row);
    let greenMark = document.createElement('img');
    greenMark.setAttribute('src', 'static/images/Green-Ball-icon.png');
    console.log(greenMark);
    row.appendChild(greenMark);

    if (target.getAttribute('class') === 'board token' && playerSteps.length / 4 >= target.dataset.row - 1) {
        target.classList.add(selectedColor);
        playerStep['selectedColor'] = selectedColor;
        playerStep['row'] = target.dataset.row;
        playerStep['token'] = target.dataset['token'];
        playerSteps.push(playerStep);
    }
});

selectableColors.addEventListener('click', function(event) {
    let target = event.target;

    if (target.getAttribute('class') === 'player token') {
        selectedColor = target.getAttribute('id');
    }
});


