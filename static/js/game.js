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

    if (target.getAttribute('class') === 'board token') {
        target.classList.add(selectedColor);
        playerStep['selectedColor'] = selectedColor;
        playerStep['row'] = target.dataset['row'];
        playerStep['token'] = target.dataset['token'];
        playerSteps.push(playerStep);
    }
    getWinnerComb(playerColorChoices)
});

selectableColors.addEventListener('click', function(event) {
    let target = event.target;

    if (target.getAttribute('class') === 'player token'){
        selectedColor = target.getAttribute('id');
    }
});


