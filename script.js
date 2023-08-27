const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn = false;
const cellElements = document.getElementsByClassName("cell");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const winingMessageText = document.querySelector('[data-winning-message-text]');
const restartBtn = document.getElementById("restartButton");
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    setBoardHover();
    [...cellElements].forEach(cell => {
        cell.addEventListener('click', handleClick, {once : true})
    });
    winningMessage.classList.remove("show");
    [...cellElements].forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
    })
}

function handleClick(e) {
    // placeMark
    const cell = e.target;
    const currentTurn = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentTurn);
    // Check for win
    if (checkWin(currentTurn)) {
        endGame();
    } else if(isDraw()) {
        endGame(true)
    } else {
        // switch turn
        switchTurn();
        // hoverBoard
        setBoardHover();
    }
}

function placeMark(cell, currentTurn) {
    cell.classList.add(currentTurn);
}

function switchTurn() {
    circleTurn = !circleTurn;
}

function setBoardHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentTurn) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return [...cellElements][index].classList.contains(currentTurn);
        })
    })
}

function endGame(draw = false) {
    winningMessage.classList.add("show");
    if (draw) {
        winingMessageText.innerHTML = "Draw";
    } else {
        winingMessageText.innerHTML = circleTurn ? 'O Win': 'X win';
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}