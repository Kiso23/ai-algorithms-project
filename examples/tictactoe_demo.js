/**
 * Tic-Tac-Toe Interactive Game Demo
 * Play against AI opponent using minimax with alpha-beta pruning
 */

import TicTacToe from '../src/games/tictactoe.js';
import { TicTacToeAI } from '../src/games/tictactoeAI.js';
import readline from 'readline';

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
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   TIC-TAC-TOE with AI opponent        ║');
  console.log('║   (Using Minimax + Alpha-Beta Pruning)║');
  console.log('╚════════════════════════════════════════╝\n');

  const game = new TicTacToe();
  const ai = new TicTacToeAI('O');

  console.log('Board positions (1-9):');
  console.log('  1 | 2 | 3');
  console.log('  ---------');
  console.log('  4 | 5 | 6');
  console.log('  ---------');
  console.log('  7 | 8 | 9\n');

  console.log('You are X, AI is O');
  console.log('Enter position (1-9) to make a move\n');

  game.printBoard();

  let gameRunning = true;
  while (gameRunning) {
    // Human player move
    let validMove = false;
    let position;

    while (!validMove) {
      const input = await question('Your move (1-9): ');
      position = parseInt(input) - 1;

      if (isNaN(position) || position < 0 || position > 8) {
        console.log('Invalid input. Enter a number between 1 and 9.');
        continue;
      }

      validMove = game.makeMove(position, 'X');
      if (!validMove) {
        console.log('That position is already taken or invalid!');
      }
    }

    game.printBoard();

    if (game.isGameOver()) {
      if (game.winner === 'X') {
        console.log('🎉 You won! Congratulations!');
      } else if (game.winner === 'Draw') {
        console.log("🤝 It's a draw!");
      }
      gameRunning = false;
      break;
    }

    // AI player move
    console.log('AI is thinking...');
    const aiResult = ai.getNextMove(game, 9);
    const aiMove = aiResult.move;

    console.log(`AI played position ${aiMove + 1}`);
    console.log(`Search depth: ${aiResult.stats.depth}`);
    console.log(`Nodes explored: ${aiResult.stats.nodesExplored}`);
    console.log(`Nodes pruned: ${aiResult.stats.nodesPruned}`);
    console.log(`Pruning efficiency: ${aiResult.stats.pruningEfficiency}`);
    console.log(`Best score: ${aiResult.stats.bestScore}\n`);

    game.makeMove(aiMove, 'O');
    game.printBoard();

    if (game.isGameOver()) {
      if (game.winner === 'O') {
        console.log('AI won! Better luck next time!');
      } else if (game.winner === 'Draw') {
        console.log("It's a draw!");
      }
      gameRunning = false;
    }
  }

  // Show game summary
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║           GAME SUMMARY                 ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log(`Total moves: ${game.moveHistory.length}`);
  console.log(`Winner: ${game.winner}`);
  console.log(`Final AI stats: ${JSON.stringify(ai.getSearchStats(), null, 2)}\n`);

  // Play again?
  const playAgain = await question('Play again? (yes/no): ');
  rl.close();

  if (playAgain.toLowerCase() === 'yes' || playAgain.toLowerCase() === 'y') {
    console.clear();
    const { createInterface } = await import('readline');
    const newRl = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Re-initialize rl with new interface
    Object.assign(rl, newRl);
    await main();
  }
}

main().catch(console.error);
