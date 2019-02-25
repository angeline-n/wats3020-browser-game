/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

let game;

class Player{
  constructor(token){
    this.token = token;
  }
}

// Tic Tac Toe Game Class
class TicTacToe {
  constructor(){
    this.player1 = new Player(cat);
    this.player2 = new Player(dog);

    this.currentPlayer = null;
    this.gameStatus = null;
    this.winner = null;
    this.moveCount = 0;

    this.startPrompt = document.querySelector('#start-prompt');
    this.movePrompt = document.querySelector('#move-prompt');
    this.currentPlayerToken = document.querySelector('#player-token');
    this.gameboard = document.querySelector('#gameboard');
    this.winScreen = document.querySelector('#win-screen');
    this.winnerToken = document.querySelector('#winner-token');
    this.drawScreen = document.querySelector('#draw-screen');

    this.gameState = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    this.winStates = [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]]
    ];
  }

  // This `checkForWinner()` method is provided for you, but you must fill in
  // the event dispatch lines that cause the end game screens to show.
  checkForWinner(){
    for (let condition of this.winStates){
      let winningCondition = true;
      for (let position of condition){
        if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
          winningCondition = false;
        }
      }
      if (winningCondition) {
        console.log('We have a winner!');
        console.log(`Condition is: ${condition}`);
        this.gameStatus = 'won';
        this.winner = this.currentPlayer;
        let winEvent = new Event('win');
        document.dispatchEvent(winEvent);
        return true; // Return a value to stop processing the additional move count check.
      }
    }
    this.moveCount++;
    console.log(`Reviewed move ${this.moveCount}.`)
    if (this.moveCount >= 9) {
        console.log(`This game is a draw at ${this.moveCount} moves.`);
        this.gameStatus = 'draw';
        let drawEvent = new Event('draw');
        document.dispatchEvent(drawEvent);
    }
  }

  recordMove(event){
    // This method handles recording a move in the `this.gameState` property.
    let tile_x = event.target.dataset.x;
    let tile_y = event.target.dataset.y; 
    this.gameState[tile_x][tile_y] = this.currentPlayerToken;
    event.target.setAttribute('class', `tile played fas fa-${this.currentPlayer.token}`);
  }
  switchPlayer(){
    // This method handles switching between players after each move.
    if (this.currentPlayer === this.player1){
      this.currentPlayer = this.player2;
    } else{
      this.currentPlayer = this.player1;
    }
    this.currentPlayerToken.setAttribute('class', `fas fa-${this.currentPlayer.token}`);
  }
  setUpTileListeners(){
    // This method sets up event listeners for tiles. It is called when we
    // start a new game. It must find all the tiles and apply event listeners
    // to them.
    let tileElements = document.querySelectorAll('.tile');
    for(let tile of tileElements){
      tile.addEventListener('click', handleMove);
    }
  }
  showWinScreen(){
    // This method displays the end game screen for a Win.
    this.winScreen.setAttribute('class', 'show');
    this.winnerToken.setAttribute('class', `fas fa-${this.winner.token}`)
  }
  showDrawScreen(){
    this.drawScreen.setAttribute('class', 'show');
  }
  setUpBoard(){
    this.gameboard.innerHTML = '';
    for (i === 0; i < 3; i++){
      let newRow = document.createElement('div');
      newRow.setAttribute('class', 'row');
      for (j===0; j < 3; j++){
        let newCol = document.createElement('div');
        newCol.setAttribute('class', 'col-xs-3');
        let newTile = document.createElement('span');
        newTile.setAttribute('class', `tile fas fa-question-sign`);
        newTile.setAttribute('data-x', i);
        newTile.setAttribute('data-y', j);
        newCol.appendChild(newTile);
        newRow.appendChild(newCol);
      }
      this.gameboard.appendChild(newRow);
    }
    this.setUpTileListeners();
  }
  initializeMovePrompt(){
      // This method initializes the `this.movePrompt` element.
      this.startPrompt.setAttribute('class', 'hidden');
      this.movePrompt.setAttribute('class', '');
      this.currentPlayer = this.player1;
      this.currentPlayerToken.setAttribute('class', `fas fa-${this.currentPlayer.token}`)
  }
  start(){
    // This method handles the logic to create a new game. 
    this.setUpBoard();
    this.initializeMovePrompt();
  }
} // End of the Tic Tac Toe Class definition.

// Outside of the Class definitions, we need a few items to control the game
// so our players can successfully play.


document.addEventListener('DOMContentLoaded', function(event){
  let startButton = document.querySelector('#start-button');
  startButton.addEventListener('click', function(event){
    game = new TicTacToe();
    game.start();
  });
});

document.addEventListener('win', game.showWinScreen());
document.addEventListener('draw', game.showDrawScreen());


// External function for event listeners provided for you.
function handleMove(event){
  // Record the move for the current player.
  game.recordMove(event);

  // Check to see if the last move was a winning move.
  game.checkForWinner();

  // Rotate players.
  game.switchPlayer();
}
