/**
 * Tic-Tac-Toe AI using Minimax with Alpha-Beta Pruning
 */

import { AlphaBetaPruning } from '../algorithms/alphabeta.js';

export class TicTacToeAI {
  constructor(player = 'O') {
    this.player = player; // AI player
    this.opponent = player === 'O' ? 'X' : 'O';
    this.alphabeta = new AlphaBetaPruning();
    this.searchStats = {};
  }

  /**
   * Get next move using minimax with alpha-beta pruning
   * @param {TicTacToe} game - Game state
   * @param {number} depth - Search depth (default: 9 for full search)
   * @returns {Object} Move and additional info
   */
  getNextMove(game, depth = 9) {
    const validMoves = game.getValidMoves();

    if (validMoves.length === 0) {
      return { move: null, score: 0, message: 'No valid moves' };
    }

    this.alphabeta.reset();

    let bestMove = null;
    let bestScore = -Infinity;

    // Try each valid move
    for (const move of validMoves) {
      const newGame = game.copy();
      newGame.makeMove(move, this.player);

      const score = this.minimax(
        newGame,
        depth - 1,
        -Infinity,
        Infinity,
        false
      );

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    this.searchStats = {
      depth,
      nodesExplored: this.alphabeta.nodesExplored,
      nodesPruned: this.alphabeta.nodesPruned,
      pruningEfficiency: this.alphabeta.getStats().pruningEfficiency,
      bestScore
    };

    return {
      move: bestMove,
      score: bestScore,
      stats: this.searchStats
    };
  }

  /**
   * Minimax with alpha-beta pruning
   * @private
   */
  minimax(game, depth, alpha, beta, isMaximizing) {
    this.alphabeta.nodesExplored++;

    // Terminal conditions
    const winner = game.checkWinner();
    if (winner === this.player) {
      return 10 - (9 - depth); // Prefer faster wins
    }
    if (winner === this.opponent) {
      return (9 - depth) - 10; // Prefer slower losses
    }
    if (winner === 'Draw' || depth === 0) {
      return 0;
    }

    const validMoves = game.getValidMoves();

    if (isMaximizing) {
      // AI's turn (maximize)
      let maxScore = -Infinity;

      for (const move of validMoves) {
        const newGame = game.copy();
        newGame.makeMove(move, this.player);

        const score = this.minimax(newGame, depth - 1, alpha, beta, false);
        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, maxScore);

        // Alpha-beta pruning
        if (alpha >= beta) {
          this.alphabeta.nodesPruned +=
            validMoves.length - (validMoves.indexOf(move) + 1);
          break;
        }
      }

      return maxScore;
    } else {
      // Opponent's turn (minimize)
      let minScore = Infinity;

      for (const move of validMoves) {
        const newGame = game.copy();
        newGame.makeMove(move, this.opponent);

        const score = this.minimax(newGame, depth - 1, alpha, beta, true);
        minScore = Math.min(minScore, score);
        beta = Math.min(beta, minScore);

        // Alpha-beta pruning
        if (alpha >= beta) {
          this.alphabeta.nodesPruned +=
            validMoves.length - (validMoves.indexOf(move) + 1);
          break;
        }
      }

      return minScore;
    }
  }

  /**
   * Evaluate board position (for limited depth)
   * @private
   */
  evaluateBoard(game) {
    const winner = game.checkWinner();

    if (winner === this.player) return 10;
    if (winner === this.opponent) return -10;
    if (winner === 'Draw') return 0;

    // Heuristic scoring
    let score = 0;

    // Score for AI's potential winning lines
    score += this.countThreats(game, this.player) * 3;

    // Penalty for opponent's potential winning lines
    score -= this.countThreats(game, this.opponent) * 3;

    // Center control bonus
    if (game.board[4] === this.player) score += 1;
    if (game.board[4] === this.opponent) score -= 1;

    // Corner control bonus
    [0, 2, 6, 8].forEach((pos) => {
      if (game.board[pos] === this.player) score += 0.5;
      if (game.board[pos] === this.opponent) score -= 0.5;
    });

    return score;
  }

  /**
   * Count potential winning lines for a player
   * @private
   */
  countThreats(game, player) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let count = 0;

    for (const [a, b, c] of winningCombinations) {
      const cells = [game.board[a], game.board[b], game.board[c]];
      const playerCount = cells.filter((cell) => cell === player).length;
      const emptyCount = cells.filter((cell) => cell === null).length;

      // Two in a row with one empty = threat
      if (playerCount === 2 && emptyCount === 1) {
        count++;
      }
    }

    return count;
  }

  /**
   * Get statistics from last search
   */
  getSearchStats() {
    return this.searchStats;
  }

  /**
   * Set AI player
   */
  setPlayer(player) {
    this.player = player;
    this.opponent = player === 'O' ? 'X' : 'O';
  }

  /**
   * Get difficulty level recommendation based on depth
   */
  static getDifficultyRecommendation(depth) {
    if (depth <= 3) return 'Easy';
    if (depth <= 5) return 'Medium';
    if (depth <= 7) return 'Hard';
    return 'Impossible';
  }
}

export default TicTacToeAI;
