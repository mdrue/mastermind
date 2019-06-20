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

let actualRowNum = 1;
let row = document.querySelector(`#row-${actualRowNum}`);

let getWinnerComb = function(playerColorChoices) {
    let winnerCombIndex = generateWinnerCombIndex();
    let winnerComb = [];
    for (i of winnerCombIndex) {
        winnerComb.push(playerColorChoices[i]);
    }
    return winnerComb;
};

// function takeNewGreenMarker(actualRowNum, previousRow) {
//     let rowLeftSide = document.querySelector(`#left-side-${actualRowNum}`);
//     let previousGreenMarker = document.querySelector('#green-marker');
//     //let greenMarker = '<img src="static/images/Green-Ball-icon.png" alt="green-marker" id=`img-${actualRowNum}`>';
//     previousRow.removeChild(previousGreenMarker);
//     let greenMarker = document.createElement('img');
//     greenMarker.setAttribute('src', 'static/images/Green-Ball-icon.png');
//     rowLeftSide.insertAdjacentElement('afterbegin', greenMarker);
// }


//let rowLeftSide = document.querySelector(`#left-side-${actualRowNum}`);
let side = document.querySelector('#side');
let greenMarker = document.createElement('img');
greenMarker.setAttribute('src', 'static/images/Green-Ball-icon.png');
greenMarker.setAttribute('id', 'green-marker');
//rowLeftSide.insertAdjacentElement('afterbegin', greenMarker);
side.appendChild(greenMarker);
greenMarker.style.position = 'absolute';
greenMarker.style.right = '0px';
greenMarker.style.top = "430px";
let greenMarkerPosition = 430;
let greenMarkerPositionDifference = 37;

function moveGreenMarker() {
    greenMarkerPosition -= 1;
    greenMarker.style.top = greenMarkerPosition + 'px';
}

function takeGreenMarkerToTheNextRow() {
    for (let i=0; i < greenMarkerPositionDifference; i++) {
        setTimeout(moveGreenMarker, 100);
    }
}


board.addEventListener('click', function(event) {
    let target = event.target;

    let playerStep = {'selectedColor': 0,
                        'row': 0,
                        'token': 0};

    actualRowNum = Math.floor((playerSteps.length+1) / 4) + 1;
    row = document.querySelector(`#row-${actualRowNum}`);

    if (target.getAttribute('class') === 'board token' && playerSteps.length / 4 >= target.dataset.row - 1) {
        target.classList.add(selectedColor);
        playerStep['selectedColor'] = selectedColor;
        playerStep['row'] = target.dataset['row'];
        playerStep['token'] = target.dataset['token'];
        playerSteps.push(playerStep);
    }

    if (playerSteps.length % 4 == 0) {
        takeGreenMarkerToTheNextRow();
        //greenMarkerPosition = greenMarkerPosition - greenMarkerPositionDifference;
    }

    getWinnerComb(playerColorChoices)
});

selectableColors.addEventListener('click', function(event) {
    let target = event.target;

    if (target.getAttribute('class') === 'player token') {
        selectedColor = target.getAttribute('id');
    }
});


