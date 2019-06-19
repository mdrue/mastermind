const board = document.querySelector('#game-board');

const boardRow = document.querySelectorAll('.board-row');

const selectableColors = document.querySelector('#selectable-colors');

let selectedColor;

let playerColorChoices = ["player-color-choice-0-0",
                            "player-color-choice-0-1",
                            "player-color-choice-0-2",
                            "player-color-choice-0-3",
                            "player-color-choice-1-0",
                            "player-color-choice-1-1",
                            "player-color-choice-1-2",
                            "player-color-choice-1-3"];

var playerSteps = [];

var generateWinnerCombIndex = function() {
    let winnerCombIndex = [];
    for (i=0; i < 4; i++) {
        winnerCombIndex.push(Math.floor(Math.random() * 8));
    }
    return winnerCombIndex;
};

let actualRow = 1;

let getWinnerComb = function(playerColorChoices) {
    let winnerCombIndex = generateWinnerCombIndex();
    let winnerComb = [];
    for (i of winnerCombIndex) {
        winnerComb.push(playerColorChoices[i]);
    }
    return winnerComb;
};

board.addEventListener('click', function(event) {
    let target = event.target;

    let playerStep = {'selectedColor': 0,
                        'row': 0,
                        'token': 0};

    actualRow = Math.floor(playerSteps.length / 4) + 1;
    let row = document.querySelector(`#row-${actualRow}`);
    let greenMark = document.createElement('img');
    greenMark.setAttribute('src', 'static/images/Green-Ball-icon.png');
    row.appendChild(greenMark);

    if (target.getAttribute('class') === 'board token' && playerSteps.length / 4 >= target.dataset.row - 1) {
        target.classList.add(selectedColor);
        playerStep['selectedColor'] = selectedColor;
        playerStep['row'] = target.dataset['row'];
        playerStep['token'] = target.dataset['token'];

        let playerStepRow = [];
        playerStepRow.push(playerStep);
        if (playerStep.length === 4) {
            playerSteps.push(playerStepRow);
        }
        console.log(playerSteps)
    }
    getWinnerComb(playerColorChoices)
});

selectableColors.addEventListener('click', function(event) {
    let target = event.target;

    if (target.getAttribute('class') === 'player token') {
        selectedColor = target.getAttribute('id');
    }
});


