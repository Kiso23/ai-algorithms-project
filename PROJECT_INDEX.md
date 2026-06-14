# AI Algorithms and Games Project - Complete Index

## 📋 Project Overview

A comprehensive educational implementation of three fundamental AI algorithms:
1. **Alpha-Beta Pruning** - Game tree search optimization
2. **Hidden Markov Model (Viterbi)** - Probabilistic state estimation
3. **Tic-Tac-Toe with AI** - Interactive game with intelligent opponent

---

## 🚀 Quick Start

```bash
# Navigate to project
cd /home/teron/Code/ai-algorithms-project

# Install dependencies (if needed)
npm install

# Start interactive menu
npm start

# Or run specific demos
node examples/alphabeta_demo.js
node examples/hmm_demo.js
node examples/tictactoe_demo.js
```

---

## 📁 Complete File Structure

```
ai-algorithms-project/
│
├── 📄 Documentation Files
│   ├── README.md                      ← Main documentation (detailed)
│   ├── QUICKSTART.md                  ← Quick start guide
│   ├── ASSIGNMENT_REQUIREMENTS.md     ← Formal requirements
│   └── PROJECT_INDEX.md               ← This file
│
├── 📦 Package Configuration
│   ├── package.json                   ← NPM configuration
│   └── .gitignore                     ← Git ignore file
│
├── 🧠 Source Code (src/)
│   │
│   ├── 🔧 Algorithms (algorithms/)
│   │   ├── alphabeta.js               ← Alpha-Beta Pruning
│   │   │   └── Methods:
│   │   │       • search()             - Main search algorithm
│   │   │       • findBestMove()       - Find optimal move
│   │   │       • maximizing()         - Maximize turn
│   │   │       • minimizing()         - Minimize turn
│   │   │       • getStats()           - Search statistics
│   │   │
│   │   └── hmm.js                     ← Hidden Markov Model
│   │       └── Methods:
│   │           • viterbi()            - Most likely sequence
│   │           • forward()            - Forward algorithm
│   │           • backward()           - Backward algorithm
│   │           • getMostLikelyStateAtTime() - State at time t
│   │
│   ├── 🎮 Games (games/)
│   │   ├── tictactoe.js               ← Game Logic
│   │   │   └── Methods:
│   │   │       • makeMove()           - Make a move
│   │   │       • checkWinner()        - Check win condition
│   │   │       • getValidMoves()      - Get available moves
│   │   │       • printBoard()         - Display board
│   │   │       • reset()              - Reset game
│   │   │
│   │   └── tictactoeAI.js             ← AI Player
│   │       └── Methods:
│   │           • getNextMove()        - Get AI move
│   │           • minimax()            - Minimax evaluation
│   │           • evaluateBoard()      - Position evaluation
│   │
│   └── index.js                       ← Main Entry Point
│       └── Features:
│           • Interactive menu
│           • Demo launcher
│           • Documentation viewer
│
└── 📚 Examples & Demos (examples/)
    ├── alphabeta_demo.js              ← Alpha-Beta Pruning Demo
    │   └── Shows:
    │       • Game tree visualization
    │       • Pruning in action
    │       • Performance comparison
    │
    ├── hmm_demo.js                    ← HMM/Viterbi Demo
    │   └── Shows:
    │       • Weather prediction system
    │       • Viterbi algorithm output
    │       • Forward/Backward algorithms
    │
    └── tictactoe_demo.js              ← Interactive Tic-Tac-Toe
        └── Features:
            • Human vs AI gameplay
            • Move validation
            • Search statistics
```

---

## 📖 Documentation Guide

### For Quick Understanding
**START HERE** → `QUICKSTART.md`
- How to run the project
- What each demo shows
- Simple examples

### For Complete Details
**READ NEXT** → `README.md`
- Full algorithm explanations
- Algorithm complexity analysis
- Real-world applications
- Learning outcomes

### For Assignment Specifics
**REFERENCE** → `ASSIGNMENT_REQUIREMENTS.md`
- Formal requirements
- Deliverables checklist
- Testing information
- Code examples

### For Code Navigation
**USE THIS** → `PROJECT_INDEX.md` (current file)
- File locations
- Function reference
- Module relationships

---

## 🔍 Algorithm Deep Dive

### 1. Alpha-Beta Pruning

**Location**: `src/algorithms/alphabeta.js`

**What it does**:
- Optimizes minimax algorithm for game trees
- Eliminates branches that don't affect final decision
- Reduces search complexity from O(b^d) to O(b^(d/2))

**Key Methods**:
```javascript
// Main entry point
findBestMove(node, depth, evalFunc, getMovesFunc)
  → Returns: { bestMove, bestValue, nodesExplored, nodesPruned }

// Core algorithm
search(node, depth, alpha, beta, isMaximizing, evalFunc, getMovesFunc)
  → Returns: Best score for current position

// Player turns
maximizing(node, depth, alpha, beta, evalFunc, getMovesFunc)
minimizing(node, depth, alpha, beta, evalFunc, getMovesFunc)
```

**Parameters**:
- `alpha`: Best value for maximizer (-∞ to +∞)
- `beta`: Best value for minimizer (-∞ to +∞)
- `depth`: Remaining search levels
- `isMaximizing`: true for MAX node, false for MIN node

**Pruning Condition**:
```
IF alpha >= beta THEN
  Prune remaining branches
END IF
```

**Demo**: `examples/alphabeta_demo.js`
- Test case 1: Basic pruning
- Test case 2: Larger tree
- Shows nodes explored, pruned, efficiency

---

### 2. Hidden Markov Model

**Location**: `src/algorithms/hmm.js`

**What it does**:
- Models systems with hidden states that evolve probabilistically
- Uses Viterbi algorithm to find most likely state sequence
- Calculates probability of observations

**Constructor**:
```javascript
new HiddenMarkovModel(
  states,           // Array of state names
  observations,     // Array of observation names
  startProb,        // Initial state probabilities
  transitionProb,   // State transition probabilities
  emissionProb      // Observation emission probabilities
)
```

**Key Methods**:
```javascript
// Find most likely state sequence (PRIMARY)
viterbi(observationSequence)
  → Returns: { path, probability, viterbiTable, backpointerTable }

// Calculate observation probability
forward(observationSequence)
  → Returns: { forwardTable, totalProbability }

// Backward pass for state estimation
backward(observationSequence)
  → Returns: { backwardTable }

// Get most likely state at specific time
getMostLikelyStateAtTime(observationSequence, t)
  → Returns: Most likely state at time t
```

**Example Application (Weather)**:
```javascript
States: ['Sunny', 'Rainy', 'Cloudy']
Observations: ['dry', 'damp', 'wet']

startProb: { Sunny: 0.6, Rainy: 0.2, Cloudy: 0.2 }
transitionProb: { Sunny → { Sunny: 0.7, Rainy: 0.1, Cloudy: 0.2 }, ... }
emissionProb: { Sunny → { dry: 0.8, damp: 0.15, wet: 0.05 }, ... }
```

**Complexity**:
- Time: O(T × N²) where T=time steps, N=states
- Space: O(T × N)

**Demo**: `examples/hmm_demo.js`
- Test 1: Viterbi algorithm
- Test 2: Forward algorithm
- Test 3: State estimation
- Test 4: Backward algorithm

---

### 3. Tic-Tac-Toe with AI

**Game Logic**: `src/games/tictactoe.js`

**Board Representation**:
```
Positions 0-8 (internal)     OR     Positions 1-9 (user input)
0 | 1 | 2                         1 | 2 | 3
---------                         ---------
3 | 4 | 5                         4 | 5 | 6
---------                         ---------
6 | 7 | 8                         7 | 8 | 9
```

**Game Class Methods**:
```javascript
// Make a move on the board
makeMove(position, player)
  → Returns: boolean (success)

// Get all valid empty positions
getValidMoves()
  → Returns: Array of valid positions

// Check for winner
checkWinner()
  → Returns: 'X', 'O', 'Draw', or null

// Reset the game
reset()
  → Clears board, resets state

// Get game state
getState()
  → Returns: { board, validMoves, currentPlayer, gameOver, winner }
```

**AI Implementation**: `src/games/tictactoeAI.js`

**AI Class Methods**:
```javascript
// Get next move for AI
getNextMove(game, depth = 9)
  → Returns: { move, score, stats }

// Minimax with alpha-beta pruning (private)
minimax(game, depth, alpha, beta, isMaximizing)
  → Returns: Score of position

// Evaluate board position (heuristic)
evaluateBoard(game)
  → Returns: Numeric score

// Count potential winning lines
countThreats(game, player)
  → Returns: Number of threats/opportunities
```

**Winning Combinations** (8 total):
```
Rows:     [0,1,2], [3,4,5], [6,7,8]
Columns:  [0,3,6], [1,4,7], [2,5,8]
Diagonals: [0,4,8], [2,4,6]
```

**Game Flow**:
```
1. Human player (X) makes move
2. Game checks for win/draw
3. AI player (O) evaluates all possibilities
4. AI makes optimal move
5. Game checks for win/draw
6. Repeat until game ends
```

**Demo**: `examples/tictactoe_demo.js`
- Interactive command-line game
- Human vs AI gameplay
- Real-time move statistics
- Replay functionality

---

## 🎯 How to Use Each Algorithm

### Using Alpha-Beta Pruning

```javascript
import { AlphaBetaPruning } from './src/algorithms/alphabeta.js';

const alphabeta = new AlphaBetaPruning();

// Find best move in a game
const result = alphabeta.findBestMove(
  gameState,
  depth,
  evaluationFunction,
  getMoveFunction
);

console.log(`Best move: ${result.bestMove}`);
console.log(`Score: ${result.bestValue}`);
console.log(`Pruning efficiency: ${result.efficiency}`);
```

### Using HMM with Viterbi

```javascript
import { HiddenMarkovModel } from './src/algorithms/hmm.js';

const hmm = new HiddenMarkovModel(
  states,
  observations,
  startProb,
  transitionProb,
  emissionProb
);

// Find most likely state sequence
const result = hmm.viterbi(['observation1', 'observation2', 'observation3']);

console.log(`Most likely states: ${result.path}`);
console.log(`Probability: ${result.probability}`);
```

### Using Tic-Tac-Toe AI

```javascript
import TicTacToe from './src/games/tictactoe.js';
import { TicTacToeAI } from './src/games/tictactoeAI.js';

const game = new TicTacToe();
const ai = new TicTacToeAI('O');

// Human move
game.makeMove(4, 'X');

// AI move
const aiResult = ai.getNextMove(game, 9);
game.makeMove(aiResult.move, 'O');

// Show stats
console.log(`Nodes explored: ${aiResult.stats.nodesExplored}`);
console.log(`Nodes pruned: ${aiResult.stats.nodesPruned}`);
```

---

## 📊 Complexity Analysis

### Alpha-Beta Pruning
| Metric | Value |
|--------|-------|
| Best case | O(b^(d/2)) |
| Average case | O(b^(3d/4)) |
| Worst case | O(b^d) |
| Space | O(d) |

### Viterbi Algorithm
| Metric | Value |
|--------|-------|
| Time | O(T × N²) |
| Space | O(T × N) |

### Tic-Tac-Toe (Depth 9)
| Metric | Value |
|--------|-------|
| Max tree depth | 9 |
| With pruning | ~100,000 nodes |
| Without pruning | ~362,880 nodes |
| Pruning gain | ~3.6x |

---

## ✨ Features & Capabilities

### Alpha-Beta Pruning
✅ Full minimax implementation
✅ Efficient alpha-beta pruning
✅ Statistics tracking
✅ Configurable search depth
✅ Performance metrics
✅ Multiple test cases

### Hidden Markov Model
✅ Viterbi algorithm (primary)
✅ Forward algorithm
✅ Backward algorithm
✅ State probability calculation
✅ Observation sequence probability
✅ Multiple test cases

### Tic-Tac-Toe
✅ Complete game logic
✅ Unbeatable AI opponent
✅ Minimax with alpha-beta pruning
✅ Move validation
✅ Win detection (all 8 combinations)
✅ Draw detection
✅ Game state tracking
✅ Move history
✅ Undo capability
✅ Board visualization
✅ Interactive CLI
✅ Search statistics

---

## 🧪 Testing & Verification

### Module Import Tests
```bash
# Test Alpha-Beta
node -e "import('./src/algorithms/alphabeta.js').then(() => console.log('✓'))"

# Test HMM
node -e "import('./src/algorithms/hmm.js').then(() => console.log('✓'))"

# Test Tic-Tac-Toe
node -e "import('./src/games/tictactoe.js').then(() => console.log('✓'))"

# Test AI
node -e "import('./src/games/tictactoeAI.js').then(() => console.log('✓'))"
```

### Demo Tests
```bash
# Run all demos in sequence
for demo in examples/*.js; do node "$demo"; done
```

---

## 🎓 Learning Path

1. **Understand the Basics** (5 min)
   - Read QUICKSTART.md
   - Run npm start

2. **Explore Alpha-Beta Pruning** (10 min)
   - Run: `node examples/alphabeta_demo.js`
   - Read: README.md section on pruning
   - Study: `src/algorithms/alphabeta.js` code

3. **Explore Hidden Markov Models** (10 min)
   - Run: `node examples/hmm_demo.js`
   - Read: README.md section on HMM
   - Study: `src/algorithms/hmm.js` code

4. **Play Tic-Tac-Toe** (5-15 min)
   - Run: `node examples/tictactoe_demo.js`
   - Try to win (you can't!)
   - Analyze AI statistics

5. **Deep Dive** (30+ min)
   - Read full documentation
   - Study source code in detail
   - Try modifying algorithms
   - Implement your own features

---

## 🔗 Quick Links

| Document | Purpose | Time |
|----------|---------|------|
| QUICKSTART.md | Get running fast | 2 min |
| README.md | Full documentation | 15 min |
| ASSIGNMENT_REQUIREMENTS.md | Formal spec | 10 min |
| alphabeta_demo.js | See pruning work | 2 min |
| hmm_demo.js | See Viterbi work | 2 min |
| tictactoe_demo.js | Play the game | 5-10 min |

---

## 🚀 Next Steps

1. **Run the project**
   ```bash
   npm start
   ```

2. **Explore each demo**
   - Choose option 1, 2, or 3
   - Read the output carefully
   - Try variations

3. **Study the code**
   - Open source files
   - Read the comments
   - Trace through algorithms

4. **Experiment**
   - Modify search depths
   - Change HMM parameters
   - Try different game strategies

5. **Extend**
   - Add difficulty levels
   - Implement new games
   - Improve heuristics

---

## ❓ Frequently Asked Questions

**Q: How do I run this?**
A: `npm start` for menu, or `node examples/*.js` for specific demos

**Q: Can I beat the AI?**
A: No! It uses perfect minimax search (unbeatable with perfect play)

**Q: How long does each demo take?**
A: Alpha-beta and HMM demos: ~5 seconds each. Tic-tac-toe is interactive.

**Q: What if my terminal is too small?**
A: Demos will still work, just might wrap weird. Make window bigger.

**Q: Can I modify the code?**
A: Yes! All source code is fully editable and well-commented.

**Q: Is this production-ready?**
A: It's educational code focused on clarity. Not optimized for production.

---

## 📚 Resources

- **Algorithm Books**: Cormen et al., Russell & Norvig
- **Online**: AlphaGo papers, HMM tutorials, game AI resources
- **Research**: Visit author websites for latest developments

---

## 📄 License & Credits

Educational implementation for learning purposes.
All algorithms implemented from scratch with proper documentation.

---

**Last Updated**: 2026-06-15  
**Version**: 1.0.0  
**Status**: Complete & Ready for Use ✅
