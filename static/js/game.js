const board = document.querySelector('#game-board');

const boardRow = document.querySelectorAll('.board-row');

const selectableColors = document.querySelector('#selectable-colors');

const reset = document.getElementById('reset');

const parse = document.getElementById('parse');

//const winningColorTokens = document.querySelectorAll('.winning.token');

let selectedColor;

//this array contains the strings that marks the colors in the HTML and CSS
//after the player picks a token on the board, the actual token gets this string as a class,
//so it will be colored through CSS
let playerColorChoices = ["player-color-choice-0-0",
                            "player-color-choice-0-1",
                            "player-color-choice-0-2",
                            "player-color-choice-0-3",
                            "player-color-choice-1-0",
                            "player-color-choice-1-1",
                            "player-color-choice-1-2",
                            "player-color-choice-1-3"];

let playerSteps = [];

//this function gets the necessary player guesses from playerSteps according to which row we need
let getActualRowColors = function(actualRowNum, playerSteps) {
    let actualRowColors = [];
    bottomLimit = (actualRowNum - 2) * 4;

    Array.from({length: 4}, (x,i) => actualRowColors.push(playerSteps[i + bottomLimit]['selectedColor']));

    return actualRowColors
};

//this function compares the player guesses and winningComb
//it returns a result array, which contains 1 and/or 2, 1 meaning the guessed color is right but the position is not,
// and 2 meaning both the color and the position is correct
let winningCheck = function(actualRowNum, playerSteps, winnerComb) {
    let playerGuesses = getActualRowColors(actualRowNum, playerSteps);

    const goodPosAndColor = 2;
    const goodColor = 1;

    let result = [];
    let restWin = [];
    let restPlayerGuesses = [];

    for (i=0; i<playerGuesses.length; i++) {
        if (winnerComb[i] === playerGuesses[i]) {
            result.push(goodPosAndColor)
        }
        else{
            restWin.push(winnerComb[i]);
            restPlayerGuesses.push(playerGuesses[i]);
        }
    }
    for (i=0; i<restWin.length; i++){
        if(restPlayerGuesses.includes(restWin[i])){
            result.push(goodColor);
            restWin.pop(restWin[i]);
            restPlayerGuesses.pop(restWin[i]);
        }
    }
    //This line checks whether the result contains four '2', meaning the player
    //has guessed everything correctly. If so, he won, the result will be 'true'
    if (result.length === 4 && result.includes(1) === false) {
        return true
    }
    return result
};

//this function generates random numbers between 0 and 7
let generateWinnerCombIndex = function() {
    let winnerCombIndex = [];
    for (i=0; i < 4; i++) {
        winnerCombIndex.push(Math.floor(Math.random() * 8));
    }
    return winnerCombIndex;
};

let actualRowNum = 1;

//this function translates the random numbers to 'colors', meaning strings that mark the colors
//from the playerColorChoices array
let getWinnerComb = function(playerColorChoices) {
    let winnerCombIndex = generateWinnerCombIndex();
    let winnerComb = [];
    for (i of winnerCombIndex) {
        winnerComb.push(playerColorChoices[i]);
    }
    return winnerComb;
};

//we generate the winningComb which contains the array of the colors (e.g.:'player-color-choice-0-0')
//the player has to guess correctly
let winnerComb = getWinnerComb(playerColorChoices);

console.log(winnerComb);

board.addEventListener('click', function(event) {
    let target = event.target;

    actualRowNum = Math.floor((playerSteps.length+1) / 4) + 1;
    let row = document.querySelector(`#row-${actualRowNum}`);
    let greenMark = document.createElement('img');
    greenMark.setAttribute('src', 'static/images/Green-Ball-icon.png');
    row.appendChild(greenMark);

    let playerStep = {'selectedColor': 0,
                        'row': 0,
                        'token': 0};

    //here we build the playerStep dictionary, which contains the necessary data about what the player
    //picked as a color, and what token did he place that color
    if (target.getAttribute('class') === 'board token' && playerSteps.length / 4 >= target.dataset.row - 1) {
        target.classList.add(selectedColor);
        playerStep['selectedColor'] = selectedColor;
        playerStep['row'] = target.dataset['row'];
        playerStep['token'] = target.dataset['token'];
        //here we save this player guess to playerSteps
        playerSteps.push(playerStep);
        localStorage.setItem('playerSteps', JSON.stringify(playerSteps));
        playerSteps = parseSteps();
    }
    const winningColorTokens = document.querySelectorAll('.winning.token');

    if (playerSteps.length % 4 === 0) {
        //result will be an array, containing 1 or 2, meaning the guessed color is right, but
        //not on the right position (1), or both the color and position is correct (2)
        let result = winningCheck(actualRowNum, playerSteps, winnerComb);
        //if the player has won...
        if (result === true) {
            for (i=0; i<winningColorTokens.length; i++) {
                winningColorTokens[i].textContent = '';
                winningColorTokens[i].classList.add(winnerComb[i]);
            }
        }
    }
});

selectableColors.addEventListener('click', function(event) {
    let target = event.target;

    if (target.getAttribute('class') === 'player token') {
        selectedColor = target.getAttribute('id');
    }
});

window.addEventListener('load', function () {
    if(localStorage.length === 0){
        const winnerComb = getWinnerComb(playerColorChoices);
        const winnerCombStr = JSON.stringify(winnerComb);
        localStorage.setItem('winnerComb', winnerCombStr);
    }
});

reset.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});

parse.addEventListener('click',function () {
    console.log(JSON.parse(localStorage.getItem('winnerComb')));
});

function parseSteps() {
    playerSteps = JSON.parse(localStorage.getItem('playerSteps'));
    console.log(playerSteps);
    return playerSteps;
}
