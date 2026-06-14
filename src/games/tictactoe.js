/**
 * Tic-Tac-Toe Game Logic
 */

export class TicTacToe {
  constructor() {
    // Board represented as array: [0-8] positions
    // 0 1 2
    // 3 4 5
    // 6 7 8
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X'; // 'X' or 'O'
    this.gameOver = false;
    this.winner = null;
    this.moveHistory = [];
  }

  /**
   * Get all valid moves (empty positions)
   */
  getValidMoves() {
    return this.board
      .map((cell, index) => (cell === null ? index : null))
      .filter((pos) => pos !== null);
  }

  /**
   * Make a move on the board
   * @param {number} position - Position 0-8
   * @param {string} player - 'X' or 'O'
   * @returns {boolean} Success
   */
  makeMove(position, player = null) {
    player = player || this.currentPlayer;

    // Check if move is valid
    if (position < 0 || position > 8 || this.board[position] !== null) {
      return false;
    }

    // Make move
    this.board[position] = player;
    this.moveHistory.push({
      position,
      player,
      boardState: [...this.board]
    });

    // Check for win or draw
    const winner = this.checkWinner();
    if (winner) {
      this.gameOver = true;
      this.winner = winner;
    } else if (this.getValidMoves().length === 0) {
      this.gameOver = true;
      this.winner = 'Draw';
    }

    // Switch player
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

    return true;
  }

  /**
   * Undo last move
   */
  undoMove() {
    if (this.moveHistory.length === 0) {
      return false;
    }

    this.moveHistory.pop();

    if (this.moveHistory.length === 0) {
      this.board = Array(9).fill(null);
    } else {
      this.board = [...this.moveHistory[this.moveHistory.length - 1].boardState];
    }

    this.gameOver = false;
    this.winner = null;
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    return true;
  }

  /**
   * Check for winner
   * @returns {string|null} 'X', 'O', 'Draw', or null
   */
  checkWinner() {
    const winningCombinations = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombinations) {
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[b] === this.board[c]
      ) {
        return this.board[a];
      }
    }

    return null;
  }

  /**
   * Check if game is over
   */
  isGameOver() {
    return this.gameOver || this.getValidMoves().length === 0;
  }

  /**
   * Get board state
   */
  getBoard() {
    return [...this.board];
  }

  /**
   * Get board as 2D array for display
   */
  getBoardDisplay() {
    return [
      [this.board[0], this.board[1], this.board[2]],
      [this.board[3], this.board[4], this.board[5]],
      [this.board[6], this.board[7], this.board[8]]
    ];
  }

  /**
   * Print board to console
   */
  printBoard() {
    console.log('\n');
    for (let i = 0; i < 3; i++) {
      let row = '';
      for (let j = 0; j < 3; j++) {
        const pos = i * 3 + j;
        const cell = this.board[pos] || (pos + 1).toString();
        row += ` ${cell} `;
        if (j < 2) row += '|';
      }
      console.log(row);
      if (i < 2) console.log('-----------');
    }
    console.log('\n');
  }

  /**
   * Reset game
   */
  reset() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winner = null;
    this.moveHistory = [];
  }

  /**
   * Get game state for AI
   */
  getState() {
    return {
      board: [...this.board],
      validMoves: this.getValidMoves(),
      currentPlayer: this.currentPlayer,
      gameOver: this.gameOver,
      winner: this.winner
    };
  }

  /**
   * Create a copy of the game state
   */
  copy() {
    const newGame = new TicTacToe();
    newGame.board = [...this.board];
    newGame.currentPlayer = this.currentPlayer;
    newGame.gameOver = this.gameOver;
    newGame.winner = this.winner;
    newGame.moveHistory = JSON.parse(JSON.stringify(this.moveHistory));
    return newGame;
  }
}

export default TicTacToe;
