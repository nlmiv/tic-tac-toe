/* ALGO TO CONTROL THE FORM */
// Get the FORM
let $modal = $("#myForm");

// Get the <span> element that closes the FORM
// When the user clicks on <span> (x), close the FORM
$("#cancelButton").on('click',() => {
  $modal.css('display','none')
})

// When the user double clicks anywhere outside of the FORM, close it
$(window).on('dblclick', () => {
  $modal.css('display','none')
})

//submit data and close FORM
function getUserInfo(){
  let humanName   = userForm.userName.value;
  let humanSymbol = userForm.symbol.value;
  let aiSymbol;

  event.preventDefault();
  (humanSymbol == "O") ? aiSymbol = "X" : aiSymbol = "O"

  human.name = humanName;
  human.symbol = humanSymbol;
  ai.name = "AI";
  ai.symbol = aiSymbol;

  $modal.css('display','none')
  displayPlayers();
  return mode = userForm.difficulty.value;
};

// get FORM submit button
$("#submitButton").on('click', getUserInfo);


/* ALGO TO SET UP & DISPLAY PLAYERS */
// factory to create players
const CreatePlayer = (name, symbol) => {
  return {name, symbol};
};

let human = CreatePlayer("", "X");
let ai    = CreatePlayer("", "O");

// display players on grid from FORM
function displayPlayers() {
  $('#userNameBox').text(human.name)
  $('#userSymbolBox').text(human.symbol)
  $('#compNameBox').text(ai.name)
  $('#compSymbolBox').text(ai.symbol)
};

/* ALGO TO CONTROL STARTING AND RESETTING*/
$('#startButton').on('click', () => {
    $modal.css('display','block')
    startGame();
})

$('#resetButton').on('click', () => {
  resetBoard();
  resetPlayers();
  $messageBoard.text("Press 'Start' to begin")
})

$('#playAgain').on('click', () => {
    resetBoard();
})

function resetBoard() {
  $messageBoard.text("Click a square to begin")
  startGame();
};

function resetPlayers() {
  human.name = "Human";
  ai.name = "Machine";
  human.symbol = "Your Symbol";
  ai.symbol = "AI Symbol";
  displayPlayers();
}


// *** ALGO TO CONTROL GAMEPLAY ***
let mode;

let origBoard;

const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

// variable to hold messageBoard
const $messageBoard = $('#messageBoard')
$messageBoard.text("Press 'Start' To Begin")

//function to create winner message
function messageWin(message) {
       $messageBoard.text(message)
       //could add a display-block here
}

// Module pattern that creates board by creating & appending buttons (with classes and ids) to parent container
// IIFE - creates the game board immediately after loading the page
const createGameBoard = ( () => {
  const gameContainer = document.getElementById("gameContainer");

  for (i = 0; i < 9; i++) {
    squ = document.createElement('div');
    squ.classList.add('squ');
    squ.setAttribute('id', i);
    gameContainer.appendChild(squ);

  }
}
)();

const squares = document.querySelectorAll('.squ');

function startGame() {
  origBoard = Array.from(Array(9).keys());
  for (let i=0; i < squares.length; i++) {
    squares[i].textContent = '';
    squares[i].style.color = "black";
    squares[i].addEventListener('click', turnClick, false);
  }
  $messageBoard.text("Click a square to begin")
}


function turnClick(square) {
  if (typeof origBoard[square.target.id] == 'number') {
    turn(square.target.id, human.symbol)
    if (!checkWin(origBoard, human.symbol) && !checkTie()) {
        if (mode == "hard") setTimeout( () => turn(bestSpot(), ai.symbol), 500); // minimax
        else                setTimeout( () => turn(easySpot(), ai.symbol), 500); // random
    }
  }
}

// machine 'EASY' (random) play
function easySpot() {
  let randomNumber = Math.random();
    if (randomNumber < 0.11 && origBoard[0] != 'O' && origBoard[0] != 'X') {
      return 0;
    } if (randomNumber < 0.22 && origBoard[1] != 'O' && origBoard[1] != 'X') {
      return 1;
    } if (randomNumber < 0.33 && origBoard[2] != 'O' && origBoard[2] != 'X') {
      return 2;
    } if (randomNumber < 0.44 && origBoard[3] != 'O' && origBoard[3] != 'X') {
      return 3;
    } if (randomNumber < 0.55 && origBoard[4] != 'O' && origBoard[4] != 'X') {
      return 4;
    } if (randomNumber < 0.66 && origBoard[5] != 'O' && origBoard[5] != 'X') {
      return 5;
    } if (randomNumber < 0.77 && origBoard[6] != 'O' && origBoard[6] != 'X') {
      return 6;
    } if (randomNumber < 0.88 && origBoard[7] != 'O' && origBoard[7] != 'X') {
      return 7;
    } if (randomNumber < 0.99 && origBoard[8] != 'O' && origBoard[8] != 'X') {
      return 8;
    } else {
      let availSpots = emptySquares();
      console.log(availSpots);
      return availSpots[0];
      }
}

function turn(squareID, player) {
    origBoard[squareID] = player;
    document.getElementById(squareID).textContent = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

// Check for Winner
function checkWin(board, player) {
  let gameWon = null;
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);

  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

// Finalise game condition
function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.color = gameWon.player == human.symbol ? "blue" : "red";
  }
  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener('click', turnClick, false);
  }
  messageWin(gameWon.player == human.symbol ? "You win!" : "You Lose.");
}

// AI (easy or hard) maps out the available space on the board for each move
function emptySquares() {
  console.log('mode=', mode);
  console.log('Empty Squares: ', origBoard.filter(s => typeof s == "number"));
  return origBoard.filter(s => typeof s == "number");
}

function bestSpot() {
  return minimax(origBoard, ai.symbol).index;
}

// Ascertain a game 'Tie' condition
function checkTie() {
  if (emptySquares().length == 0) {
    for (let i = 0; i < squares.length; i++) {
      // squares[i].style.backgroundColor = "green";
      squares[i].removeEventListener("click", turnClick, false);
    }
    messageWin("Tie Game!")
    return true;
  }
  return false;
}
