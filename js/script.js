let squares = document.getElementsByClassName("squares");
let gamesAnalized = 0;
let player = "X";
let isComputerMax = false; 

let board = ["", "", "",
    "", "", "",
    "", "", ""];

function updateBoard() {
    for (let i = 0; i < board.length; i++) {
        squares[i].innerHTML = board[i];
    }
    if (isGameOver()[0]) {
        alert("Game Over!");
    }
}

updateBoard();

function mark(square) {
    if (!isGameOver()[0]) {
        board[square] = player;
        if (player == "X") {
            player = "O";
        } else {
            player = "X";
        }
    }

    return square;
}

function unmark(square) {
    board[square] = "";
    if (player == "X") {
        player = "O";
    } else {
        player = "X";
    }
}

function restartGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].innerHTML = "";
        board[i] = "";
    }
    player = "X";
}

function isGameOver() {
    if (board[0] != "" && board[0] == board[4] && board[4] == board[8]) {
        return [true, board[0]];
    }

    if (board[2] != "" && board[2] == board[4] && board[4] == board[6]) {
        return [true, board[2]];
    }

    for (let i = 0; i < 3; i++) {
        if (board[i] != "" && board[i] == board[i + 3] && board[i + 3] == board[i + 6]) {
            return [true, board[i]];
        }
        if (board[i * 3] != "" && board[i * 3] == board[i * 3 + 1] && board[i * 3 + 1] == board[i * 3 + 2]) {
            return [true, board[i * 3]];
        }
    };

    for (let i = 0; i < 9; i++) {
        if (board[i] == "") {
            return [false, null];
        }
    };

    return [true, "Tie"];
}

function Moves() {
    let moves = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] == "") {
            moves.push(i);
        }
    };
    return moves;
}

function computerMove(isMax = false) {
    gamesAnalized = 0;

    let time1 = performance.now();
    let Mm = minimax(isMax);
    let time2 = performance.now();

    let seconds = Math.round((time2 - time1)) / 1000;
    console.log(gamesAnalized + " Games Analized");
    console.log("It took " + seconds + " seconds");
    console.log("Avg speed: " + Math.round(gamesAnalized * 100 / seconds) / 100 + " games per second");

    mark(Mm[1]);
    updateBoard();
}

function minimax(isMax) {
    let gameOver = isGameOver();
    let bestMove = 0;

    if (gameOver[0]) {
        gamesAnalized++;
        if (gameOver[1] == "X") {
            return [1,];
        } else if (gameOver[1] == "O") {
            return [-1,];
        } else {
            return [0,];
        }
    }


    if (isMax) {
        var maxEval = -Infinity;

        for (let i = 0, moves = Moves(), len = moves.length; i < len; i++) {
            let move = mark(moves[i]);
            let eval = minimax(false)[0];
            unmark(move);

            if (eval > maxEval) {
                maxEval = eval;
                bestMove = move;
            }
        }
        return [maxEval, bestMove];
    }

    else {
        var minEval = +Infinity;

        for (let i = 0, moves = Moves(), len = moves.length; i < len; i++) {
            let move = mark(moves[i]);
            let eval = minimax(true)[0];
            unmark(move);

            if (eval < minEval) {
                minEval = eval;
                bestMove = move;
            }

        }

        return [minEval, bestMove];
    }
}

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
        mark(i)
        updateBoard()
        if (!isGameOver()[0]) {
            computerMove(isComputerMax)
        }
    });
}