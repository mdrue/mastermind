function main() {
    const board = document.querySelector('#game-board');

    const boardRow = document.querySelectorAll('.board-row');

    const selectableColors = document.querySelector('#selectable-colors');

    const reset = document.getElementById('reset');

    let actualRowNum = loadActualRowNum();

    //const winningColorTokens = document.querySelectorAll('.winning.token');

    let selectedColor;

    let winnerComb = loadWinnerComb();

    let playerSteps = loadPlayerSteps();

    let rowResults = loadResults();

    console.log(winnerComb);
    console.log(actualRowNum);
    console.log(playerSteps);

    // These variables and configurations determine the greenmarker
    let side = document.querySelector('#side');
    let greenMarker = document.createElement('img');
    greenMarker.setAttribute('src', 'static/images/Actions-go-next-icon.png');
    greenMarker.setAttribute('id', 'green-marker');
    side.appendChild(greenMarker);
    greenMarker.style.position = 'absolute';
    greenMarker.style.right = '0px';
    greenMarker.style.top = "430px";
    let greenMarkerPosition = 430;
    let greenMarkerPositionDifference = 37;



        //this function compares the player guesses and winningComb
        //it returns a result array, which contains 1 and/or 2, 1 meaning the guessed color is right but the position is not,
        // and 2 meaning both the color and the position is correct




    // These two functions are responsible for moving the greenmarker
    let moveGreenMarker = function() {
        greenMarkerPosition -= 1;
        greenMarker.style.top = greenMarkerPosition + 'px';
    };

    let takeGreenMarkerToTheNextRow = function() {
        for (let i=0; i < greenMarkerPositionDifference; i++) {
            setTimeout(moveGreenMarker, 100);
        }
    };


    //we generate the winningComb which contains the array of the colors (e.g.:'player-color-choice-0-0')
    //the player has to guess correctly

    board.addEventListener('click', function(event) {
        let target = event.target;
        actualRowNum = Math.floor((playerSteps.length+1) / 4) + 1;
        localStorage.setItem('actualRowNum', actualRowNum);
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

        if (playerSteps.length % 4 == 0) {
            takeGreenMarkerToTheNextRow();
        }

        const winningColorTokens = document.querySelectorAll('.winning.token');

        if (playerSteps.length % 4 === 0) {
            //result will be an array, containing 1 or 2, meaning the guessed color is right, but
            //not on the right position (1), or both the color and position is correct (2)
            let result = winningCheck(actualRowNum, playerSteps, winnerComb);
            rowResults.push(result);
            localStorage.setItem('rowResults', JSON.stringify(rowResults));

            //if the player has won...
            if (result === true) {
                for (i = 0; i < winningColorTokens.length; i++) {
                    winningColorTokens[i].textContent = '';
                    winningColorTokens[i].classList.add(winnerComb[i]);
                }
            }
            else{
                show_evaluation_result(result, actualRowNum);
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
        if(localStorage.length > 1){
            for(let playerStep of playerSteps){
                let tokenId = `token-${playerStep['row']}-${playerStep['token']}`;
                let token = document.getElementById(tokenId);
                token.setAttribute('class', `board token ${playerStep['selectedColor']}`);
            }
            for(let i=0; i<actualRowNum-1; i++){
                takeGreenMarkerToTheNextRow();
            }
            for(let i=1; i<actualRowNum; i++){
                let result = winningCheck(i,playerSteps,winnerComb);
                show_evaluation_result(result, i);
            }
        }
    });

    reset.addEventListener('click', function () {
        localStorage.clear();
        location.reload();
    });




}

function parseSteps() {
    let playerSteps = JSON.parse(localStorage.getItem('playerSteps'));
    return playerSteps;
}

function loadResults() {
    let rowResults;
    if(localStorage.getItem('rowResults')){
        rowResults = JSON.parse(localStorage['rowResults']);
    }
    return rowResults;
}

function loadActualRowNum(){
    let actualRowNum;
    if(localStorage.getItem('actualRowNum')){
        actualRowNum = localStorage['actualRowNum'];
    }
    else{
        actualRowNum = 1;
    }
    return actualRowNum;
}

function loadPlayerSteps(){
    let playerSteps = [];
    if (localStorage.getItem('playerSteps')){
        playerSteps = parseSteps();
    }
    return playerSteps;
}

function loadWinnerComb(){
    let winnerComb;
    if (localStorage.getItem('winnerComb')){
        winnerComb = JSON.parse(localStorage.getItem('winnerComb'));
    }
    else{
        winnerComb = getWinnerComb();
        localStorage.setItem('winnerComb', JSON.stringify(winnerComb));
    }
    return winnerComb;
}

//this function generates random numbers between 0 and 7
function generateWinnerCombIndex (){
    let winnerCombIndex = [];
    for (i=0; i < 4; i++) {
        winnerCombIndex.push(Math.floor(Math.random() * 8));
    }
    return winnerCombIndex;
}


//this function translates the random numbers to 'colors', meaning strings that mark the colors
//from the playerColorChoices array
function getWinnerComb() {
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
    let winnerCombIndex = generateWinnerCombIndex();
    let winnerComb = [];
    for (i of winnerCombIndex) {
        winnerComb.push(playerColorChoices[i]);
    }
    return winnerComb;
}

function winningCheck (actualRowNum, playerSteps, winnerComb) {
    let playerGuesses = getActualRowColors(actualRowNum, playerSteps);

    const goodPosAndColor = 2;
    const goodColor = 1;

    let result = [];
    let restWin = [];
    let restPlayerGuesses = [];

    for (let i=0; i<playerGuesses.length; i++) {
        if (winnerComb[i] === playerGuesses[i]) {
            result.push(goodPosAndColor)
        }
        else{
            restWin.push(winnerComb[i]);
            restPlayerGuesses.push(playerGuesses[i]);
        }
    }
    for (let i=0; i<restWin.length; i++){
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
}

function getActualRowColors (actualRowNum, playerSteps) {
    let actualRowColors = [];
    let bottomLimit = (actualRowNum - 2) * 4;

    Array.from({length: 4}, (x,i) => actualRowColors.push(playerSteps[i + bottomLimit]['selectedColor']));

    return actualRowColors
}

function show_evaluation_result (result, actualRowNum) {
    let num_of_twos = 0;
    let num_of_ones = 0;

    for (num of result) {
        if (num === 2) {
            num_of_twos += 1;
        } else if (num === 1) {
            num_of_ones += 1;
        }
    }
    let rightSide = document.querySelector(`#row-${actualRowNum - 1}`);

    for (i=0; i<num_of_twos; i++) {
        let goodPosAndColor = document.createElement('img');
        goodPosAndColor.setAttribute('src','static/images/Green-Ball-icon.png');
        goodPosAndColor.setAttribute('id', `good-pos-and-color-marker-${i}`);
        rightSide.appendChild(goodPosAndColor);
    }
    for (i=0; i<num_of_ones; i++) {
        let goodColor = document.createElement('img');
        goodColor.setAttribute('src','static/images/Yellow-Ball-icon.png');
        goodColor.setAttribute('id', `good-color-marker-${i}`);
        rightSide.appendChild(goodColor);
    }

};


main();
