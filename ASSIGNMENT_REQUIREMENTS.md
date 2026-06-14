# AI Algorithms and Games - Assignment Requirements

## 👤 Student Information

| Field | Value |
|-------|-------|
| **Name** | Sarlongki Teron |
| **Roll No** | 220710007052 |
| **Semester** | 8th Semester |
| **Branch** | Computer Science and Engineering |
| **Subject** | Artificial Intelligence |
| **Assignment** | AI Assignment |

---

## Project Overview

This project implements three fundamental AI algorithms with practical demonstrations:

1. **Alpha-Beta Pruning** - Game tree search optimization
2. **Hidden Markov Model** - Statistical state estimation  
3. **Tic-Tac-Toe with AI** - Interactive game with intelligent opponent

---

## Requirements Met

### 1. Alpha-Beta Pruning ✅

**What is it?**
- Optimization technique for minimax algorithm used in game-playing AI
- Eliminates branches that won't affect the final decision
- Dramatically reduces search space from O(b^d) to O(b^(d/2))

**Implementation:**
- File: `src/algorithms/alphabeta.js`
- Core methods:
  - `search()` - Main alpha-beta search
  - `findBestMove()` - Find optimal move
  - `maximizing()` / `minimizing()` - Player turns
  - Pruning statistics tracking

**Demo:**
- File: `examples/alphabeta_demo.js`
- Shows game tree traversal
- Demonstrates pruning decisions
- Performance metrics comparison
- Test cases with different tree sizes

**Key Concepts:**
```
Alpha (α) - Best value for maximizer found so far
Beta (β)  - Best value for minimizer found so far
Pruning   - Cut when α ≥ β
```

---

### 2. Hidden Markov Model (Viterbi Algorithm) ✅

**What is it?**
- Statistical model representing systems with hidden states
- States evolve probabilistically based on transitions
- Observations are probabilistically emitted from states
- Viterbi algorithm finds most likely state sequence

**Implementation:**
- File: `src/algorithms/hmm.js`
- Core methods:
  - `viterbi()` - Find most likely state sequence (PRIMARY)
  - `forward()` - Calculate observation probability
  - `backward()` - Backward pass for state estimation
  - `getMostLikelyStateAtTime()` - State at specific time

**Demo:**
- File: `examples/hmm_demo.js`
- Application: Weather prediction system
- Test cases:
  1. Viterbi algorithm with weather observations
  2. Forward algorithm probability calculation
  3. Backward algorithm demonstration
  4. State estimation at each time step

**Example Application:**
```
Hidden States: Sunny, Rainy, Cloudy
Observations:  dry, damp, wet
Given: [dry, damp, wet, wet]
Find: Most likely [Sunny, Sunny, Rainy, Rainy]
```

**Complexity:**
- Time: O(T × N²) where T=time steps, N=states
- Space: O(T × N)

---

### 3. Tic-Tac-Toe with AI ✅

**Game Logic:**
- File: `src/games/tictactoe.js`
- Features:
  - 3×3 board representation
  - Move validation
  - Win detection (all 8 winning combinations)
  - Draw detection
  - Game state tracking
  - Undo capability
  - Move history

**AI Implementation:**
- File: `src/games/tictactoeAI.js`
- Algorithm: Minimax with Alpha-Beta Pruning
- Features:
  - Unbeatable opponent
  - Configurable search depth
  - Move scoring
  - Threat detection heuristics
  - Search statistics
  - Performance metrics

**Interactive Demo:**
- File: `examples/tictactoe_demo.js`
- Features:
  - Command-line interface
  - Human vs AI gameplay
  - Board visualization
  - Move validation
  - Search statistics display
  - Replay capability

**Game Flow:**
```
1. User makes move (X)
2. AI thinks (alpha-beta search)
3. AI moves (O)
4. Check for win/draw
5. Repeat until game over
```

---

## Running the Project

### Installation
```bash
cd ai-algorithms-project
npm install
```

### Main Application
```bash
npm start
# Interactive menu to choose demos
```

### Individual Demos

**Alpha-Beta Pruning:**
```bash
node examples/alphabeta_demo.js
```
Output: Game tree visualization with pruning

**Hidden Markov Model:**
```bash
node examples/hmm_demo.js
```
Output: Weather prediction with Viterbi algorithm

**Tic-Tac-Toe:**
```bash
node examples/tictactoe_demo.js
```
Output: Interactive game, play against unbeatable AI

---

## Code Examples

### Using Alpha-Beta Pruning
```javascript
import { AlphaBetaPruning } from './src/algorithms/alphabeta.js';

const alphabeta = new AlphaBetaPruning();
const result = alphabeta.search(node, depth, alpha, beta, isMaximizing, eval, getMoves);

console.log(`Best move: ${result}`);
console.log(`Efficiency: ${alphabeta.getStats().pruningEfficiency}`);
```

### Using HMM with Viterbi
```javascript
import { HiddenMarkovModel } from './src/algorithms/hmm.js';

const hmm = new HiddenMarkovModel(states, obs, startProb, tranProb, emitProb);
const result = hmm.viterbi(['dry', 'damp', 'wet']);

console.log(`Most likely path: ${result.path}`);
console.log(`Probability: ${result.probability}`);
```

### Using Tic-Tac-Toe AI
```javascript
import TicTacToe from './src/games/tictactoe.js';
import { TicTacToeAI } from './src/games/tictactoeAI.js';

const game = new TicTacToe();
const ai = new TicTacToeAI('O');

game.makeMove(4, 'X'); // Human move
const aiResult = ai.getNextMove(game, 9);
game.makeMove(aiResult.move, 'O'); // AI move
```

---

## Algorithm Complexity Analysis

### Alpha-Beta Pruning
| Scenario | Complexity |
|----------|-----------|
| Without pruning | O(b^d) |
| With perfect move ordering | O(b^(d/2)) |
| Average case | O(b^(3d/4)) |
| Space complexity | O(d) |

**b** = branching factor, **d** = depth

### Viterbi Algorithm
| Metric | Value |
|--------|-------|
| Time Complexity | O(T × N²) |
| Space Complexity | O(T × N) |
| T = time steps | Variable |
| N = number of states | Variable |

### Tic-Tac-Toe
| Metric | Value |
|--------|-------|
| Maximum tree depth | 9 |
| Maximum branching factor | 9 |
| With pruning | ~O(7^(9/2)) = ~O(100,000) |
| Without pruning | ~O(9!) = ~362,880 |

---

## Testing

Create test files in `tests/` directory:

```bash
# Run tests (when implemented)
npm test
```

---

## Project Deliverables

✅ **Alpha-Beta Pruning**
- Working implementation with pruning
- Demo showing tree traversal and pruning
- Efficiency metrics and comparison

✅ **Hidden Markov Model**
- Viterbi algorithm implementation
- Forward and backward algorithms
- Weather prediction example
- Detailed probability calculations

✅ **Tic-Tac-Toe Game**
- Complete game logic
- Unbeatable AI using minimax + alpha-beta
- Interactive command-line interface
- Search statistics and performance metrics

✅ **Documentation**
- README with setup instructions
- Algorithm explanations
- Code examples
- Learning resources

✅ **Code Quality**
- Well-commented code
- Modular design
- Clean separation of concerns
- Reusable components

---

## Learning Outcomes

Upon completing this project, you should understand:

1. **Game Theory & Minimax**
   - Minimax algorithm
   - Zero-sum games
   - Optimal play strategies

2. **Optimization Techniques**
   - Alpha-beta pruning
   - Move ordering
   - Search optimization

3. **Probabilistic Systems**
   - Hidden Markov Models
   - State transitions
   - Emission probabilities

4. **Algorithms**
   - Viterbi algorithm
   - Forward-backward algorithm
   - Dynamic programming

5. **AI Implementation**
   - Game playing AI
   - Decision making
   - Search strategies

---

## Real-World Applications

### Alpha-Beta Pruning
- Chess engines (Stockfish, AlphaGo)
- Game AI in video games
- Strategic game development
- Decision trees in general

### Hidden Markov Models
- Speech recognition
- Natural language processing
- Protein sequence analysis
- Stock market prediction
- Weather forecasting

### Game AI
- Video game opponents
- Chess and board games
- Strategy games
- Interactive entertainment

---

## Submission Checklist

- [x] Alpha-Beta Pruning implementation
- [x] HMM with Viterbi algorithm
- [x] Tic-Tac-Toe game with AI
- [x] Interactive demos for all three
- [x] Comprehensive documentation
- [x] Code examples
- [x] Performance metrics
- [x] Learning materials

---

## Additional Resources

- **Algorithm Visualizations**: Try different game trees
- **Extensions**: Add difficulty levels, improve heuristics
- **Variations**: Implement Connect-4, Checkers, or other games
- **Research**: Explore Monte Carlo Tree Search (MCTS)

---

**Note**: This project is designed for educational purposes. All implementations follow best practices and include detailed explanations to support learning.
