/**
 * Hidden Markov Model Demo
 * Weather prediction using HMM with Viterbi algorithm
 */

import { HiddenMarkovModel } from '../src/algorithms/hmm.js';

console.log('\n╔════════════════════════════════════════╗');
console.log('║   Hidden Markov Model - Weather Demo   ║');
console.log('║   (Using Viterbi Algorithm)            ║');
console.log('╚════════════════════════════════════════╝\n');

// Define states and observations
const states = ['Sunny', 'Rainy', 'Cloudy'];
const observations = ['dry', 'damp', 'wet'];

// Initial state probabilities
const startProb = {
  Sunny: 0.6,
  Rainy: 0.2,
  Cloudy: 0.2
};

// State transition probabilities
// P(next_state | current_state)
const transitionProb = {
  Sunny: {
    Sunny: 0.7,
    Rainy: 0.1,
    Cloudy: 0.2
  },
  Rainy: {
    Sunny: 0.4,
    Rainy: 0.4,
    Cloudy: 0.2
  },
  Cloudy: {
    Sunny: 0.25,
    Rainy: 0.25,
    Cloudy: 0.5
  }
};

// Emission probabilities
// P(observation | state)
const emissionProb = {
  Sunny: {
    dry: 0.8,
    damp: 0.15,
    wet: 0.05
  },
  Rainy: {
    dry: 0.1,
    damp: 0.3,
    wet: 0.6
  },
  Cloudy: {
    dry: 0.3,
    damp: 0.5,
    wet: 0.2
  }
};

// Create HMM
const hmm = new HiddenMarkovModel(
  states,
  observations,
  startProb,
  transitionProb,
  emissionProb
);

console.log('📊 HMM Configuration:');
console.log('States:', states);
console.log('Observations:', observations);
console.log('Initial state probabilities:', startProb);
console.log('\n');

// Test case 1: Sequence of observations
console.log('─'.repeat(50));
console.log('TEST 1: Weather Prediction');
console.log('─'.repeat(50));

const observations1 = ['dry', 'damp', 'wet', 'wet'];
console.log(`Observation sequence: [${observations1.join(', ')}]`);
console.log('(What we observe: dry → damp → wet → wet)');
console.log('\n');

const viterbiResult = hmm.viterbi(observations1);
console.log('📍 Most likely weather sequence (Viterbi):');
console.log('Path:', viterbiResult.path);
console.log('Probability:', viterbiResult.probability.toExponential(6));
console.log('');

// Show probability details
console.log('Detailed probability breakdown:');
for (let t = 0; t < observations1.length; t++) {
  console.log(`\n  Time ${t}:`);
  console.log(`  Observation: ${observations1[t]}`);
  console.log(`  State: ${viterbiResult.path[t]}`);

  const stateProbs = viterbiResult.viterbiTable[t];
  for (const state of states) {
    console.log(`    P(${state}) = ${stateProbs[state].toExponential(6)}`);
  }
}

// Test case 2: Forward algorithm (probability of observations)
console.log('\n\n');
console.log('─'.repeat(50));
console.log('TEST 2: Probability Calculation');
console.log('─'.repeat(50));

const observations2 = ['dry', 'damp', 'wet'];
console.log(`Observation sequence: [${observations2.join(', ')}]`);

const forwardResult = hmm.forward(observations2);
console.log(`\nP(observations) = ${forwardResult.totalProbability.toExponential(6)}`);

console.log('\nForward algorithm probabilities:');
for (let t = 0; t < observations2.length; t++) {
  console.log(`\n  Time ${t} (observation: ${observations2[t]}):`);
  const probs = forwardResult.forwardTable[t];
  for (const state of states) {
    console.log(`    P(${state}) = ${probs[state].toExponential(6)}`);
  }
}

// Test case 3: Most likely state at each time given all observations
console.log('\n\n');
console.log('─'.repeat(50));
console.log('TEST 3: Most Likely State Estimation');
console.log('─'.repeat(50));

const observations3 = ['dry', 'damp', 'damp', 'wet', 'wet'];
console.log(`Observation sequence: [${observations3.join(', ')}]`);

console.log('\nMost likely state at each time step:');
for (let t = 0; t < observations3.length; t++) {
  const state = hmm.getMostLikelyStateAtTime(observations3, t);
  console.log(`  Time ${t}: ${state} (observed: ${observations3[t]})`);
}

// Test case 4: Backward algorithm
console.log('\n\n');
console.log('─'.repeat(50));
console.log('TEST 4: Backward Algorithm');
console.log('─'.repeat(50));

const observations4 = ['dry', 'damp', 'wet'];
console.log(`Observation sequence: [${observations4.join(', ')}]`);

const backwardResult = hmm.backward(observations4);
console.log('\nBackward algorithm probabilities:');
for (let t = observations4.length - 1; t >= 0; t--) {
  console.log(`\n  Time ${t} (observation: ${observations4[t]}):`);
  const probs = backwardResult.backwardTable[t];
  for (const state of states) {
    console.log(`    P(${state}) = ${probs[state].toExponential(6)}`);
  }
}

// Summary
console.log('\n\n');
console.log('═'.repeat(50));
console.log('KEY CONCEPTS DEMONSTRATED:');
console.log('═'.repeat(50));

console.log(`
✓ Viterbi Algorithm
  Finds the most likely sequence of hidden states given observations
  Used for: Speech recognition, sequence alignment, decoding

✓ Forward Algorithm
  Calculates probability of observation sequence
  Used for: Likelihood estimation, model evaluation

✓ Backward Algorithm
  Works backwards from observations to estimate probabilities
  Used for: Expectation-Maximization training

✓ State Estimation
  Finds most likely state at each time given all observations
  Used for: Real-time state tracking
`);

console.log('═'.repeat(50));
console.log('');
