//tic tac toe game flow----------------------------------------
//gameboard has 9 squares
// game has 2 players, each take a turn over the other
// each player has their own marks being only X or O
// game has 9 slots with states of Empty,X or O
// game ends when a player aligns their mark on three cells in a row diagnally/horizontally or vertically
// a tie happens when all the board cells are filled and there are no winners
// horizonal board indexes [0-1-2,3-4-5,6-7-8]
// vertical board indexes [0-3-6,1-4-7,2-5-8]
// diagonal board indexes [0-4-8,2-4-6]

//Game Objects
/*
    Gameboard - where the game happens(board)
              - handles methods that deal with the board like getting which cell and set cell of a turn m
              - Doesn’t know about players, turns, or win logic.

    Player  - the one that plays the game
            - has a name and a mark
            - They don’t “have a turn”; the game controller has a “current player” and switches between these two.

    Game Controller - Runs the game: whose turn, when a move is allowed, when the game is over.
                    - Has something like playTurn(index): use Gameboard to set the cell with the current player’s mark, then check win/tie, then switch current player or end the game.
                    - Uses Gameboard (set/get) and the two Player objects (to get the current player’s mark/name).

*/



const gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    return {
        getboard() {
            return board;
        },
        getcell(index) {
            return board[index];
        },
        setcell(index, mark) {
            board[index] = mark;
        },
        reset() {
            board = ["", "", "", "", "", "", "", "", ""];
        }
    }
})();

function player(name, mark) {
    return {
        name: name,//?
        mark: mark// so this essentially replaces this right?
    }
}

let player1 = player("Player1", "X");
let player2 = player("Player2", "O");




const gamecontroller = (function () {
    // starts the game
    let boardgame = gameboard;
    let currentplayer = player1;
    let maxturn = 0;
    let gameState = "ongoing";

    console.log(`Game Start! ${currentplayer} turn first:`)
    console.log(boardgame.getboard())
    //take input here 

    function checkWinner() {
        let boardindex = boardgame.getboard()
        //Player wins Horizontal line
        if (boardindex[0] == currentplayer.mark && boardindex[1] == currentplayer.mark && boardindex[2] == currentplayer.mark) {
            return true;

        } else if (boardindex[3] == currentplayer.mark && boardindex[4] == currentplayer.mark && boardindex[5] == currentplayer.mark) {
            return true
        }
        else if (boardindex[6] == currentplayer.mark && boardindex[7] == currentplayer.mark && boardindex[8] == currentplayer.mark) {
            return true
        }
        //Player wins Vertical
        if (boardindex[0] == currentplayer.mark && boardindex[3] == currentplayer.mark && boardindex[6] == currentplayer.mark) {
            return true

        } else if (boardindex[1] == currentplayer.mark && boardindex[4] == currentplayer.mark && boardindex[7] == currentplayer.mark) {
            return true
        }
        else if (boardindex[2] == currentplayer.mark && boardindex[5] == currentplayer.mark && boardindex[8] == currentplayer.mark) {
            return true
        }
        //Player wins Diagonal
        if (boardindex[0] == currentplayer.mark && boardindex[4] == currentplayer.mark && boardindex[8] == currentplayer.mark) {
            return true

        } else if (boardindex[2] == currentplayer.mark && boardindex[4] == currentplayer.mark && boardindex[6] == currentplayer.mark) {
            return true
        }
    }
    return {
        playTurn(index) {
            if (maxturn == 9) {
                console.log("Game Over")
                gameState = "tie";
                return
            }
            let playerindex = index
            let getcell = boardgame.getcell(playerindex)
            if (getcell.length === 0 && gameState == "ongoing") {
                boardgame.setcell(playerindex, currentplayer.mark)

                let isWin = checkWinner(currentplayer.mark)

                if (isWin) {
                    gameState = "win";
                    return { gameState, isWin, currentplayer }
                } else if (!isWin && maxturn == 8) {
                    gameState = "tie";

                    return { gameState, isWin, currentplayer }
                }


                console.log(boardgame.getboard())
                if (currentplayer == player1) {
                    currentplayer = player2;
                } else {
                    currentplayer = player1
                }
                maxturn++

            } else {
                console.log("That cell is taken by the other player")
            }
        },
        reset() {
            currentplayer = player1;
            maxturn = 0
            gameState = "ongoing";
            boardgame.reset();
        }
    }


})();

//t
const displaycontroller = (function () {
    const cells = document.getElementsByClassName('game-cell');
    const textwinner = document.getElementById('WinnerText')
    const reset = document.getElementById('reset-button')
    for (let i = 0; i <= 8; i++) {
        cells[i].addEventListener("click", () => {
            let result = gamecontroller.playTurn(i)
            renderboard()
            renderwinner(result)
        });
    }
    reset.addEventListener("click", () => {
        gamecontroller.reset()
        resetUI()
    })

    function renderboard() {
        let boardinstance = gameboard.getboard();
        for (let i = 0; i <= 8; i++) {
            cells[i].textContent = boardinstance[i];
            if (boardinstance[i] == "X") {
                cells[i].style.color = "blue";
            } else if (boardinstance[i] == "O") {
                cells[i].style.color = "red";
            }
        }

    }

    function renderwinner(outcome) {
        if (outcome != null) {
            let winner = outcome.currentplayer
            if (outcome.gameState == "win") {
                textwinner.style.visibility = "visible";
                textwinner.textContent = `${winner.name} is the winner!`;
            } else if (outcome.gameState == "tie") {
                textwinner.style.visibility = "visible";
                textwinner.textContent = `The Game ended in a tie! No more turns left `;
            }

        }

    }

    function resetUI() {
        for (let i = 0; i <= 8; i++) {
            cells[i].textContent = "";
        }
        textwinner.textContent = "";
        textwinner.style.visibility = "hidden";
    }
    return {
        renderboard,
        renderwinner
    }
})();
