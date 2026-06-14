#!/usr/bin/env node

/**
 * Main Entry Point for AI Algorithms Project
 * Choose which demo/algorithm to explore
 */

import readline from 'readline';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.clear();
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║  AI ALGORITHMS AND GAMES PROJECT                  ║');
  console.log('║  Alpha-Beta Pruning | HMM | Tic-Tac-Toe AI        ║');
  console.log('╚════════════════════════════════════════════════════╝\n');

  console.log('Select an algorithm or game to explore:\n');
  console.log('1. Alpha-Beta Pruning Visualization');
  console.log('2. Hidden Markov Model (Viterbi) Demo');
  console.log('3. Tic-Tac-Toe with AI (Interactive Game)');
  console.log('4. View Documentation');
  console.log('5. Exit\n');

  const choice = await question('Enter your choice (1-5): ');

  switch (choice.trim()) {
    case '1':
      console.clear();
      console.log('Starting Alpha-Beta Pruning Demo...\n');
      await runDemo('examples/alphabeta_demo.js');
      break;

    case '2':
      console.clear();
      console.log('Starting HMM Viterbi Demo...\n');
      await runDemo('examples/hmm_demo.js');
      break;

    case '3':
      console.clear();
      console.log('Starting Tic-Tac-Toe Game...\n');
      rl.close();
      await runDemo('examples/tictactoe_demo.js');
      return;

    case '4':
      displayDocumentation();
      break;

    case '5':
      console.log('\nGoodbye! 👋\n');
      rl.close();
      process.exit(0);

    default:
      console.log('Invalid choice. Please try again.\n');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await main();
      return;
  }

  // Ask to continue
  const continueChoice = await question('\nWould you like to run another demo? (yes/no): ');

  if (
    continueChoice.toLowerCase() === 'yes' ||
    continueChoice.toLowerCase() === 'y'
  ) {
    await main();
  } else {
    console.log('\nThank you for exploring AI Algorithms! 👋\n');
    rl.close();
    process.exit(0);
  }
}

async function runDemo(filePath) {
  try {
    const { stdout, stderr } = await execAsync(`node ${filePath}`, {
      cwd: import.meta.url.replace('file://', '').split('/src/index.js')[0]
    });

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error(`Error running demo: ${error.message}`);
  }
}

function displayDocumentation() {
  console.clear();
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║              PROJECT DOCUMENTATION                 ║');
  console.log('╚════════════════════════════════════════════════════╝\n');

  console.log('📚 ALGORITHMS OVERVIEW:\n');

  console.log('1️⃣  ALPHA-BETA PRUNING');
  console.log('   └─ Optimization of minimax algorithm for game trees');
  console.log('   └─ Eliminates branches that won\'t affect final decision');
  console.log('   └─ Complexity: O(b^(d/2)) vs O(b^d) for minimax');
  console.log('   └─ Applications: Chess, Go, game AI\n');

  console.log('2️⃣  HIDDEN MARKOV MODEL (Viterbi Algorithm)');
  console.log('   └─ Statistical model with hidden states');
  console.log('   └─ Viterbi finds most likely state sequence');
  console.log('   └─ Complexity: O(T × N²) where T=time, N=states');
  console.log('   └─ Applications: Speech recognition, NLP, genetics\n');

  console.log('3️⃣  TIC-TAC-TOE WITH AI');
  console.log('   └─ Unbeatable AI using minimax + alpha-beta pruning');
  console.log('   └─ Game tree search with pruning optimization');
  console.log('   └─ Interactive command-line gameplay');
  console.log('   └─ Demonstrates practical AI implementation\n');

  console.log('📁 PROJECT STRUCTURE:\n');
  console.log('src/');
  console.log('├── algorithms/');
  console.log('│   ├── alphabeta.js      (Alpha-Beta Pruning)');
  console.log('│   └── hmm.js            (Hidden Markov Model)');
  console.log('├── games/');
  console.log('│   ├── tictactoe.js      (Game Logic)');
  console.log('│   └── tictactoeAI.js    (AI Player)');
  console.log('└── index.js              (Entry Point)\n');

  console.log('examples/');
  console.log('├── alphabeta_demo.js     (Alpha-Beta Demo)');
  console.log('├── hmm_demo.js           (HMM Demo)');
  console.log('└── tictactoe_demo.js     (Interactive Game)\n');

  console.log('🎯 LEARNING OUTCOMES:\n');
  console.log('✓ Understand minimax algorithm and game theory');
  console.log('✓ Implement efficient game tree search with pruning');
  console.log('✓ Learn probabilistic systems (HMM)');
  console.log('✓ Apply Viterbi algorithm for state sequences');
  console.log('✓ Build practical AI game opponents\n');

  console.log('📖 REFERENCES:\n');
  console.log('• Russell & Norvig: AI Modern Approach');
  console.log('• Rabiner & Juang: Hidden Markov Models');
  console.log('• Chess programming techniques\n');
}

main().catch(console.error);
