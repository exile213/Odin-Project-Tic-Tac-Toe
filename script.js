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
        }
    }
})();

function player(name, mark) {
    return {
        name: name,//?
        mark: mark// so this essentially replaces this right?
    }
}

let player1 = player("Emil", "X");
let player2 = player("Diaz", "O");


const gamecontroller = (function () {
    // starts the game
    let boardgame = gameboard;
    let currentplayer = player1;

    console.log(`Game Start! ${currentplayer} turn first:`)
    console.log(boardgame.getboard())
    //take input here 

    return {
        playTurn(index) {
            let playerindex = index
            let getcell = boardgame.getcell(playerindex)
            if (getcell.length === 0) {
                boardgame.setcell(playerindex, currentplayer.mark)
                console.log(boardgame.getboard())
                if (currentplayer == player1) {
                    currentplayer = player2;
                } else {
                    currentplayer = player1
                }
            } else {
                console.log("That cell is taken by the other player")
            }
        }
    }
})();
