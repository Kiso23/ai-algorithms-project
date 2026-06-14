/**
 * Alpha-Beta Pruning Demo
 * Game tree search with pruning visualization
 */

import { AlphaBetaPruning } from '../src/algorithms/alphabeta.js';

console.log('\n╔════════════════════════════════════════╗');
console.log('║   Alpha-Beta Pruning Visualization     ║');
console.log('║   (Game Tree Search Optimization)      ║');
console.log('╚════════════════════════════════════════╝\n');

// Simple game tree for demonstration
class SimpleGameNode {
  constructor(value = null, children = []) {
    this.value = value; // Leaf value
    this.children = children;
    this.isLeaf = value !== null;
  }
}

// Create a sample game tree
//           A
//       /   |   \
//      B    C    D
//     / \  / \  / \
//    1  2 3  4 5  6

const gameTree = new SimpleGameNode(null, [
  new SimpleGameNode(null, [
    new SimpleGameNode(1),
    new SimpleGameNode(2)
  ]),
  new SimpleGameNode(null, [
    new SimpleGameNode(3),
    new SimpleGameNode(4)
  ]),
  new SimpleGameNode(null, [
    new SimpleGameNode(5),
    new SimpleGameNode(6)
  ])
]);

// Create evaluator
class TreeEvaluator {
  constructor(tree) {
    this.tree = tree;
    this.visitedNodes = [];
    this.prunedBranches = [];
  }

  evaluate(node, depth, alpha, beta, isMaximizing) {
    this.visitedNodes.push({
      value: node.value,
      depth,
      alpha,
      beta,
      isMaximizing
    });

    if (node.isLeaf) {
      console.log(
        `${'  '.repeat(depth)}Leaf: ${node.value}, α=${alpha}, β=${beta}`
      );
      return node.value;
    }

    let result;
    if (isMaximizing) {
      result = this.evaluateMax(node, depth, alpha, beta);
    } else {
      result = this.evaluateMin(node, depth, alpha, beta);
    }

    return result;
  }

  evaluateMax(node, depth, alpha, beta) {
    let maxVal = -Infinity;
    console.log(`${'  '.repeat(depth)}MAX node, α=${alpha}, β=${beta}`);

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const val = this.evaluate(child, depth + 1, alpha, beta, false);
      maxVal = Math.max(maxVal, val);
      alpha = Math.max(alpha, val);

      if (alpha >= beta) {
        console.log(
          `${'  '.repeat(depth)}🔪 PRUNING! (α=${alpha} >= β=${beta})`
        );
        this.prunedBranches.push({
          depth,
          childIndex: i,
          remaining: node.children.length - i - 1
        });
        break;
      }
    }

    return maxVal;
  }

  evaluateMin(node, depth, alpha, beta) {
    let minVal = Infinity;
    console.log(`${'  '.repeat(depth)}MIN node, α=${alpha}, β=${beta}`);

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const val = this.evaluate(child, depth + 1, alpha, beta, true);
      minVal = Math.min(minVal, val);
      beta = Math.min(beta, val);

      if (alpha >= beta) {
        console.log(
          `${'  '.repeat(depth)}🔪 PRUNING! (α=${alpha} >= β=${beta})`
        );
        this.prunedBranches.push({
          depth,
          childIndex: i,
          remaining: node.children.length - i - 1
        });
        break;
      }
    }

    return minVal;
  }
}

// Test 1: Standard Minimax without pruning
console.log('─'.repeat(50));
console.log('TEST 1: Minimax WITHOUT Alpha-Beta Pruning');
console.log('─'.repeat(50));
console.log('\nTreewalk (all nodes evaluated):\n');

let nodesWithout = 0;
function countNodes(node) {
  nodesWithout++;
  if (!node.isLeaf) {
    for (const child of node.children) {
      countNodes(child);
    }
  }
}
countNodes(gameTree);
console.log(`Total nodes evaluated: ${nodesWithout}`);

// Test 2: Minimax with Alpha-Beta Pruning
console.log('\n\n');
console.log('─'.repeat(50));
console.log('TEST 2: Minimax WITH Alpha-Beta Pruning');
console.log('─'.repeat(50));
console.log('\nTreewalk with pruning:\n');

const evaluator = new TreeEvaluator(gameTree);
const result = evaluator.evaluate(gameTree, 0, -Infinity, Infinity, true);

console.log(`\nFinal value: ${result}`);
console.log(`Nodes evaluated: ${evaluator.visitedNodes.length}`);
console.log(`Branches pruned: ${evaluator.prunedBranches.length}`);

// Test 3: Performance comparison
console.log('\n\n');
console.log('─'.repeat(50));
console.log('TEST 3: Performance Metrics');
console.log('─'.repeat(50));

const pruningRate = (
  (evaluator.prunedBranches.length / (nodesWithout - 1)) *
  100
).toFixed(2);
const efficiency = (((nodesWithout - evaluator.visitedNodes.length) / nodesWithout) * 100).toFixed(2);

console.log(`\nWithout pruning:   ${nodesWithout} nodes`);
console.log(`With pruning:      ${evaluator.visitedNodes.length} nodes`);
console.log(`Nodes saved:       ${nodesWithout - evaluator.visitedNodes.length}`);
console.log(`Efficiency gain:   ${efficiency}%`);
console.log(`Pruning rate:      ${pruningRate}%`);

// Test 4: Larger game tree
console.log('\n\n');
console.log('─'.repeat(50));
console.log('TEST 4: Larger Game Tree (Depth 4)');
console.log('─'.repeat(50));

// Create a larger tree
function createGameTree(depth, breadth) {
  if (depth === 0) {
    return new SimpleGameNode(Math.floor(Math.random() * 10) + 1);
  }

  const children = [];
  for (let i = 0; i < breadth; i++) {
    children.push(createGameTree(depth - 1, breadth));
  }
  return new SimpleGameNode(null, children);
}

const largeTree = createGameTree(3, 3); // Depth 3, branching factor 3

// Count all nodes without pruning
let largeNodesWithout = 0;
function countAllNodes(node) {
  largeNodesWithout++;
  if (!node.isLeaf) {
    for (const child of node.children) {
      countAllNodes(child);
    }
  }
}
countAllNodes(largeTree);

// Evaluate with pruning
const largeEvaluator = new TreeEvaluator(largeTree);
largeEvaluator.evaluate(largeTree, 0, -Infinity, Infinity, true);

const largePruningRate = (
  ((largeNodesWithout - largeEvaluator.visitedNodes.length) /
    largeNodesWithout) *
  100
).toFixed(2);

console.log(`\nTree size: Depth 3, Branching factor 3`);
console.log(`Total possible nodes: ${largeNodesWithout}`);
console.log(`Nodes evaluated: ${largeEvaluator.visitedNodes.length}`);
console.log(`Pruning efficiency: ${largePruningRate}%`);

// Summary and key insights
console.log('\n\n');
console.log('═'.repeat(50));
console.log('KEY INSIGHTS:');
console.log('═'.repeat(50));

console.log(`
✓ Alpha Value (α)
  Best score achievable by maximizer so far
  Always increases in MAX nodes

✓ Beta Value (β)
  Best score achievable by minimizer so far
  Always decreases in MIN nodes

✓ Pruning Condition
  When α >= β, remaining branches don't matter
  Cut: Save computation without missing best move

✓ Efficiency
  Average case: ~O(b^(d/2)) instead of O(b^d)
  Where b = branching factor, d = depth
  Can be 10-100x faster with good move ordering!

✓ Move Ordering Matters
  Best moves first → more pruning
  Worst moves first → less pruning
  Makes huge difference in real games!
`);

console.log('═'.repeat(50));
console.log('');
