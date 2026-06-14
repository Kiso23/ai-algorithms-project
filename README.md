# AI Algorithms and Games Project

## 👤 Student Information

| Field | Details |
|-------|---------|
| **Name** | Sarlongki Teron |
| **Roll No** | 220710007052 |
| **Semester** | 8th Semester |
| **Branch** | Computer Science and Engineering |
| **Subject** | Artificial Intelligence |
| **Assignment** | AI Assignment |

---

## 📖 Project Description

A comprehensive implementation of fundamental AI algorithms and interactive games, including Alpha-Beta Pruning visualization, Hidden Markov Model (Viterbi algorithm), and an interactive Tic-Tac-Toe game with AI opponent.

## Features

### 1. Alpha-Beta Pruning Visualization
- Implements minimax algorithm with alpha-beta pruning
- Interactive visualization showing pruning process
- Demonstrates efficiency gains over standard minimax
- Shows game tree traversal with pruning branches

### 2. Hidden Markov Model (Viterbi Algorithm)
- Complete HMM implementation
- Viterbi algorithm for finding most likely state sequence
- Example: Weather prediction system
- Forward algorithm for probability calculations
- Real-world applications demonstration

### 3. Interactive Tic-Tac-Toe Game with AI
- Minimax-based AI opponent using alpha-beta pruning
- Unbeatable AI player
- Interactive command-line interface
- Game state visualization
- Multiple difficulty levels (coming soon)

## Project Structure

```
ai-algorithms-project/
├── src/
│   ├── index.js                    # Main entry point
│   ├── algorithms/
│   │   ├── alphabeta.js            # Alpha-Beta Pruning implementation
│   │   ├── hmm.js                  # Hidden Markov Model implementation
│   │   └── viterbi.js              # Viterbi algorithm
│   ├── games/
│   │   ├── tictactoe.js            # Tic-Tac-Toe game logic
│   │   └── tictactoeAI.js          # AI player implementation
│   └── utils/
│       ├── logger.js               # Logging utilities
│       └── visualizer.js           # Visualization helpers
├── tests/
│   ├── alphabeta.test.js           # Alpha-beta pruning tests
│   ├── hmm.test.js                 # HMM tests
│   └── tictactoe.test.js           # Tic-tac-toe tests
├── examples/
│   ├── alphabeta_demo.js           # Alpha-beta pruning demo
│   ├── hmm_demo.js                 # HMM demo
│   └── tictactoe_demo.js           # Tic-tac-toe demo
├── package.json
├── README.md
└── .gitignore
```

## Installation

```bash
# Navigate to project directory
cd ai-algorithms-project

# Install dependencies (if any)
npm install
```

## Usage

### Run Main Application
```bash
npm start
```

### Run with Watch Mode (Development)
```bash
npm run dev
```

### Run Examples

#### Alpha-Beta Pruning Demo
```bash
node examples/alphabeta_demo.js
```

#### Hidden Markov Model Demo
```bash
node examples/hmm_demo.js
```

#### Tic-Tac-Toe Game
```bash
node examples/tictactoe_demo.js
```

## Algorithms Explained

### 1. Alpha-Beta Pruning

Alpha-Beta Pruning is an optimization technique for the Minimax algorithm used in game-playing AI:

- **Minimax**: Recursively evaluates all possible game states
- **Alpha-Beta Pruning**: Eliminates branches that won't affect the final decision
- **Efficiency**: Reduces search space from O(b^d) to approximately O(b^(d/2))
- **Applications**: Chess, Go, Tic-Tac-Toe, and other two-player games

**Key Concepts:**
- Alpha: Best value for maximizer found so far
- Beta: Best value for minimizer found so far
- Pruning: Cut branches when alpha >= beta

### 2. Hidden Markov Model (HMM)

A statistical model representing a system with hidden states that evolve probabilistically:

- **States**: Observable and hidden states
- **Transitions**: Probability of moving from one state to another
- **Emissions**: Probability of observing a particular output given a state
- **Viterbi Algorithm**: Finds the most likely sequence of hidden states

**Example Application: Weather Prediction**
- Hidden states: Actual weather (sunny, rainy, cloudy)
- Observations: What we can observe (umbrella presence, mood)
- Viterbi algorithm finds most likely weather sequence given observations

### 3. Tic-Tac-Toe with AI

An interactive implementation of Tic-Tac-Toe featuring an unbeatable AI opponent:

- **AI Strategy**: Uses Minimax with Alpha-Beta Pruning
- **Game Flow**: Human vs AI in command-line interface
- **Board Representation**: 3x3 grid with positions 1-9
- **Win Detection**: Checks all possible winning combinations

## Algorithm Complexity

### Alpha-Beta Pruning
- **Time Complexity**: O(b^(d/2)) with good move ordering
- **Space Complexity**: O(d) for recursion stack
- **Best Case**: O(b^(d/2))
- **Worst Case**: O(b^d) (no pruning occurs)

### Viterbi Algorithm
- **Time Complexity**: O(T * N^2) where T is time steps, N is number of states
- **Space Complexity**: O(T * N)

### Tic-Tac-Toe AI
- **Tree Depth**: Maximum 9 levels
- **Branching Factor**: Up to 9 possible moves
- **Pruning**: Highly effective due to game symmetry

## Code Examples

### Alpha-Beta Pruning
```javascript
import { AlphaBetaPruning } from './src/algorithms/alphabeta.js';

const alphabeta = new AlphaBetaPruning();
const result = alphabeta.search(gameState, depth, alpha, beta, isMaximizing);
console.log(`Best move value: ${result}`);
```

### Hidden Markov Model
```javascript
import { HMM } from './src/algorithms/hmm.js';

const hmm = new HMM(states, observations, startProb, transProb, emitProb);
const likelySequence = hmm.viterbi(observations);
console.log(`Most likely state sequence: ${likelySequence}`);
```

### Tic-Tac-Toe
```javascript
import { TicTacToe } from './src/games/tictactoe.js';
import { TicTacToeAI } from './src/games/tictactoeAI.js';

const game = new TicTacToe();
const ai = new TicTacToeAI();
const aiMove = ai.getNextMove(game.board);
game.makeMove(aiMove, 'AI');
```

## Learning Outcomes

After completing this project, you will understand:

1. **Minimax Algorithm**: How game-playing AI evaluates moves
2. **Alpha-Beta Pruning**: Optimization techniques for game trees
3. **Hidden Markov Models**: Probabilistic systems with hidden states
4. **Viterbi Algorithm**: Finding most likely state sequences
5. **Game Theory**: Two-player zero-sum game analysis
6. **Implementation**: Practical coding of complex algorithms

## Real-World Applications

### Alpha-Beta Pruning
- Chess engines (Stockfish, Deep Blue)
- Checkers AI
- Go playing AI
- Strategic game development

### Hidden Markov Models
- Speech recognition
- Natural language processing
- Protein sequence analysis
- Stock market prediction
- Weather forecasting

### Game AI
- Video game opponents
- Automated game playing
- Competitive AI systems

## References

1. Russell, S., & Norvig, P. (2020). Artificial Intelligence: A Modern Approach (4th ed.)
2. Rabiner, L. R. (1989). A tutorial on hidden Markov models and selected applications in speech recognition
3. Chess programming: Alpha-Beta Pruning techniques
4. Viterbi Algorithm and HMM resources

## Author

AI Algorithms Project - Educational Implementation

**Student**: Sarlongki Teron (220710007052)  
**Subject**: Artificial Intelligence  
**Semester**: 8th | **Branch**: CSE

## License

ISC

## Notes

This project is designed for educational purposes. It demonstrates fundamental AI concepts through clear implementations and practical examples. Feel free to modify, extend, and experiment with the code to deepen your understanding of these algorithms.

---

For more information or questions, refer to the individual algorithm implementations in the `src/algorithms/` and `src/games/` directories.
