# Quick Start Guide

## Installation

```bash
cd /home/teron/Code/ai-algorithms-project
npm install
```

## Running the Project

### Option 1: Interactive Menu (Recommended)
```bash
npm start
```

This launches an interactive menu where you can choose:
1. Alpha-Beta Pruning Visualization
2. Hidden Markov Model (Viterbi) Demo
3. Play Tic-Tac-Toe against AI
4. View Documentation
5. Exit

### Option 2: Run Individual Demos

**Alpha-Beta Pruning Demo:**
```bash
node examples/alphabeta_demo.js
```

**Hidden Markov Model Demo:**
```bash
node examples/hmm_demo.js
```

**Play Tic-Tac-Toe:**
```bash
node examples/tictactoe_demo.js
```

## What Each Demo Shows

### 1. Alpha-Beta Pruning Demo
- **Duration**: ~5 seconds
- **Shows**:
  - Game tree traversal
  - Alpha-beta cutoffs (pruning)
  - Performance comparison
  - Efficiency metrics
  - Larger tree example

- **Key Metrics**:
  - Nodes explored vs pruned
  - Efficiency percentage
  - Complexity reduction

### 2. HMM/Viterbi Demo
- **Duration**: ~5 seconds
- **Shows**:
  - Weather prediction system
  - Viterbi algorithm output
  - Forward algorithm probabilities
  - Backward algorithm computation
  - State estimation examples

- **Key Metrics**:
  - Most likely state sequence
  - Probability values
  - State probabilities at each time

### 3. Tic-Tac-Toe Game
- **Duration**: Interactive (play as long as you want)
- **Shows**:
  - Interactive board
  - Move validation
  - AI thinking process
  - Search statistics
  - Game results

- **How to Play**:
  1. Enter position (1-9) for your move
  2. AI automatically responds
  3. Win, lose, or draw
  4. Play again option

- **Board Layout**:
  ```
  1 | 2 | 3
  ---------
  4 | 5 | 6
  ---------
  7 | 8 | 9
  ```

## File Structure Quick Reference

```
ai-algorithms-project/
├── src/
│   ├── algorithms/
│   │   ├── alphabeta.js       ← Alpha-Beta Pruning
│   │   └── hmm.js             ← Hidden Markov Model
│   ├── games/
│   │   ├── tictactoe.js       ← Game Logic
│   │   └── tictactoeAI.js     ← AI Player
│   └── index.js               ← Main Menu
├── examples/
│   ├── alphabeta_demo.js      ← Run standalone
│   ├── hmm_demo.js            ← Run standalone
│   └── tictactoe_demo.js      ← Run standalone
├── package.json
├── README.md                  ← Full documentation
├── ASSIGNMENT_REQUIREMENTS.md ← Detailed requirements
└── QUICKSTART.md              ← This file
```

## Understanding the Algorithms

### Alpha-Beta Pruning
**Key Idea**: Skip branches that won't affect the final decision
- Alpha = best for maximizer
- Beta = best for minimizer
- Prune when α ≥ β
- ~10-100x faster than standard minimax!

**Speed**: < 1 second for tic-tac-toe

### Viterbi Algorithm
**Key Idea**: Find most likely hidden state sequence given observations
- Uses dynamic programming
- Efficient probability calculation
- Tracks best path as we go
- Perfect for: speech recognition, genome analysis

**Speed**: < 1 second for weather example

### Tic-Tac-Toe AI
**Key Idea**: Use minimax + alpha-beta pruning for unbeatable AI
- No hardcoded strategy
- Evaluates all possibilities
- Always plays optimally
- Makes best move in milliseconds

**Result**: You can't beat it! (But you can tie)

## Example Usage

### Try Alpha-Beta
```bash
$ npm start
# Choose option 1
# See game tree exploration with pruning
# Get efficiency metrics
```

### Try HMM
```bash
$ npm start
# Choose option 2
# See weather prediction analysis
# Understand Viterbi algorithm output
```

### Play Tic-Tac-Toe
```bash
$ npm start
# Choose option 3
# Enter positions 1-9
# Try to beat the AI (spoiler: you can't!)
```

## Troubleshooting

**Q: "command not found: npm"**
- Install Node.js from nodejs.org
- Then: `npm install`

**Q: Can't get past AI in Tic-Tac-Toe?**
- That's the point! AI is using minimax
- Best you can do is tie if you play perfectly
- Try different opening moves to test

**Q: Demo runs too fast, can't read output?**
- Add `pause()` calls or save output to file
- Or read the individual source files in `examples/`

**Q: Want to modify algorithms?**
- Edit files in `src/algorithms/` or `src/games/`
- Run individual demos to test
- See code comments for implementation details

## Next Steps

1. **Understand**: Read algorithm explanations in README.md
2. **Explore**: Run each demo and study the output
3. **Experiment**: Modify parameters and run again
4. **Extend**: Add your own features or games
5. **Learn**: Study the source code to understand implementation

## Performance Tips

- **Tic-Tac-Toe depth 9**: Full search, unbeatable
- **Tic-Tac-Toe depth 5**: Still very strong, faster
- **Tic-Tac-Toe depth 3**: Still good, educational level
- **HMM example**: ~100 states max for real-time
- **Alpha-Beta**: More effective with better move ordering

## Expected Output Examples

### Alphabeta Demo Output
```
─────────────────────────────────
TEST 1: Minimax WITHOUT Alpha-Beta Pruning
─────────────────────────────────
Total nodes evaluated: 13

─────────────────────────────────
TEST 2: Minimax WITH Alpha-Beta Pruning
─────────────────────────────────
Final value: 3
Nodes evaluated: 8
Efficiency gain: 38.46%
```

### HMM Demo Output
```
Most likely weather sequence (Viterbi):
Path: [Sunny, Sunny, Rainy, Rainy]
Probability: 1.32e-5
```

### Tic-Tac-Toe Game
```
1 | 2 | 3
---------
4 | X | 6
---------
7 | 8 | 9

Your move (1-9): 1
AI is thinking...
AI played position 5

 X | 2 | 3
---------
4 | O | 6
---------
7 | 8 | 9
```

## Getting Help

1. Read README.md for detailed explanations
2. Check ASSIGNMENT_REQUIREMENTS.md for formal specifications
3. Look at code comments in src/ files
4. Try modifying values and see what happens
5. Study the demo output to understand algorithm behavior

## Have Fun! 🎮🧠

This project demonstrates how computers can play games intelligently and reason about uncertain events. Each algorithm has real-world applications from chess engines to medical diagnosis systems.

Enjoy exploring AI! 🚀
