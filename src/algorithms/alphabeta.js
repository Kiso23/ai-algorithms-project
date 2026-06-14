/**
 * Alpha-Beta Pruning Algorithm Implementation
 * Optimized minimax for game tree search with pruning
 */

export class AlphaBetaPruning {
  constructor() {
    this.nodesExplored = 0;
    this.nodesPruned = 0;
    this.searchTree = [];
  }

  /**
   * Alpha-Beta search algorithm
   * @param {Object} node - Current game state
   * @param {number} depth - Remaining search depth
   * @param {number} alpha - Best value for maximizer
   * @param {number} beta - Best value for minimizer
   * @param {boolean} isMaximizing - Whether this is a maximizing node
   * @param {Function} evalFunc - Evaluation function for leaf nodes
   * @param {Function} getMovesFunc - Function to get possible moves
   * @returns {number} The best score achievable from this position
   */
  search(node, depth, alpha, beta, isMaximizing, evalFunc, getMovesFunc) {
    this.nodesExplored++;

    // Terminal node: return evaluation
    if (depth === 0 || this.isTerminal(node)) {
      return evalFunc(node);
    }

    if (isMaximizing) {
      return this.maximizing(node, depth, alpha, beta, evalFunc, getMovesFunc);
    } else {
      return this.minimizing(node, depth, alpha, beta, evalFunc, getMovesFunc);
    }
  }

  /**
   * Maximizing player's turn
   */
  maximizing(node, depth, alpha, beta, evalFunc, getMovesFunc) {
    let value = -Infinity;
    const moves = getMovesFunc(node);

    for (const move of moves) {
      const newNode = this.makeMove(node, move);
      const evalValue = this.search(
        newNode,
        depth - 1,
        alpha,
        beta,
        false,
        evalFunc,
        getMovesFunc
      );

      value = Math.max(value, evalValue);
      alpha = Math.max(alpha, value);

      // Beta cutoff: prune remaining branches
      if (alpha >= beta) {
        this.nodesPruned += moves.length - (moves.indexOf(move) + 1);
        break;
      }
    }

    return value;
  }

  /**
   * Minimizing player's turn
   */
  minimizing(node, depth, alpha, beta, evalFunc, getMovesFunc) {
    let value = Infinity;
    const moves = getMovesFunc(node);

    for (const move of moves) {
      const newNode = this.makeMove(node, move);
      const evalValue = this.search(
        newNode,
        depth - 1,
        alpha,
        beta,
        true,
        evalFunc,
        getMovesFunc
      );

      value = Math.min(value, evalValue);
      beta = Math.min(beta, value);

      // Alpha cutoff: prune remaining branches
      if (alpha >= beta) {
        this.nodesPruned += moves.length - (moves.indexOf(move) + 1);
        break;
      }
    }

    return value;
  }

  /**
   * Find best move using alpha-beta pruning
   * @param {Object} node - Current game state
   * @param {number} depth - Search depth
   * @param {Function} evalFunc - Evaluation function
   * @param {Function} getMovesFunc - Function to get possible moves
   * @returns {Object} Object containing best move and score
   */
  findBestMove(node, depth, evalFunc, getMovesFunc) {
    this.nodesExplored = 0;
    this.nodesPruned = 0;

    let bestMove = null;
    let bestValue = -Infinity;
    const moves = getMovesFunc(node);

    for (const move of moves) {
      const newNode = this.makeMove(node, move);
      const value = this.search(
        newNode,
        depth - 1,
        -Infinity,
        Infinity,
        false,
        evalFunc,
        getMovesFunc
      );

      if (value > bestValue) {
        bestValue = value;
        bestMove = move;
      }
    }

    return {
      bestMove,
      bestValue,
      nodesExplored: this.nodesExplored,
      nodesPruned: this.nodesPruned,
      efficiency: `${((this.nodesPruned / this.nodesExplored) * 100).toFixed(2)}%`
    };
  }

  /**
   * Check if node is terminal (game over)
   */
  isTerminal(node) {
    // Override in subclass or pass as parameter
    return node.isTerminal === true;
  }

  /**
   * Make a move on the board
   */
  makeMove(node, move) {
    // Override in subclass or pass as parameter
    return { ...node, lastMove: move };
  }

  /**
   * Get statistics about the search
   */
  getStats() {
    return {
      nodesExplored: this.nodesExplored,
      nodesPruned: this.nodesPruned,
      pruningEfficiency: `${((this.nodesPruned / (this.nodesExplored + this.nodesPruned)) * 100).toFixed(2)}%`
    };
  }

  /**
   * Reset statistics
   */
  reset() {
    this.nodesExplored = 0;
    this.nodesPruned = 0;
    this.searchTree = [];
  }
}

export default AlphaBetaPruning;
