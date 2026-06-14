/**
 * Hidden Markov Model Implementation
 * Includes Viterbi algorithm and Forward algorithm
 */

export class HiddenMarkovModel {
  /**
   * Initialize HMM
   * @param {string[]} states - List of hidden states
   * @param {string[]} observations - List of possible observations
   * @param {Object} startProb - Initial state probabilities
   * @param {Object} transitionProb - State transition probabilities
   * @param {Object} emissionProb - Emission probabilities (state -> observation)
   */
  constructor(states, observations, startProb, transitionProb, emissionProb) {
    this.states = states;
    this.observations = observations;
    this.startProb = startProb;
    this.transitionProb = transitionProb;
    this.emissionProb = emissionProb;
  }

  /**
   * Viterbi Algorithm - Find most likely state sequence
   * @param {string[]} observationSequence - Sequence of observations
   * @returns {Object} Most likely state sequence and probability
   */
  viterbi(observationSequence) {
    const T = observationSequence.length;
    const N = this.states.length;

    // Probability table: viterbi[t][state] = probability
    const viterbi = Array(T)
      .fill(null)
      .map(() => ({}));

    // Path table: backpointer[t][state] = previous state
    const backpointer = Array(T)
      .fill(null)
      .map(() => ({}));

    // Initialize first column (t=0)
    for (const state of this.states) {
      const obs = observationSequence[0];
      viterbi[0][state] =
        this.startProb[state] * this.emissionProb[state][obs];
      backpointer[0][state] = null;
    }

    // Fill in the rest of the table (t=1 to T-1)
    for (let t = 1; t < T; t++) {
      for (const state of this.states) {
        const obs = observationSequence[t];
        let maxProb = 0;
        let maxPrevState = null;

        // Find best previous state
        for (const prevState of this.states) {
          const prob =
            viterbi[t - 1][prevState] *
            this.transitionProb[prevState][state] *
            this.emissionProb[state][obs];

          if (prob > maxProb) {
            maxProb = prob;
            maxPrevState = prevState;
          }
        }

        viterbi[t][state] = maxProb;
        backpointer[t][state] = maxPrevState;
      }
    }

    // Backtrack to find best path
    let bestState = null;
    let bestProb = 0;

    for (const state of this.states) {
      if (viterbi[T - 1][state] > bestProb) {
        bestProb = viterbi[T - 1][state];
        bestState = state;
      }
    }

    // Reconstruct path
    const path = [bestState];
    for (let t = T - 1; t > 0; t--) {
      bestState = backpointer[t][bestState];
      path.unshift(bestState);
    }

    return {
      path,
      probability: bestProb,
      viterbiTable: viterbi,
      backpointerTable: backpointer
    };
  }

  /**
   * Forward Algorithm - Calculate observation sequence probability
   * @param {string[]} observationSequence - Sequence of observations
   * @returns {Object} Forward probabilities and total probability
   */
  forward(observationSequence) {
    const T = observationSequence.length;
    const N = this.states.length;

    // Forward table: forward[t][state] = probability
    const forward = Array(T)
      .fill(null)
      .map(() => ({}));

    // Initialize (t=0)
    for (const state of this.states) {
      const obs = observationSequence[0];
      forward[0][state] =
        this.startProb[state] * this.emissionProb[state][obs];
    }

    // Fill in the rest (t=1 to T-1)
    for (let t = 1; t < T; t++) {
      for (const state of this.states) {
        const obs = observationSequence[t];
        let sum = 0;

        for (const prevState of this.states) {
          sum +=
            forward[t - 1][prevState] *
            this.transitionProb[prevState][state] *
            this.emissionProb[state][obs];
        }

        forward[t][state] = sum;
      }
    }

    // Calculate total probability
    let totalProb = 0;
    for (const state of this.states) {
      totalProb += forward[T - 1][state];
    }

    return {
      forwardTable: forward,
      totalProbability: totalProb
    };
  }

  /**
   * Backward Algorithm - Calculate backward probabilities
   * @param {string[]} observationSequence - Sequence of observations
   * @returns {Object} Backward probabilities
   */
  backward(observationSequence) {
    const T = observationSequence.length;
    const N = this.states.length;

    // Backward table: backward[t][state] = probability
    const backward = Array(T)
      .fill(null)
      .map(() => ({}));

    // Initialize (t=T-1)
    for (const state of this.states) {
      backward[T - 1][state] = 1.0;
    }

    // Fill in backwards (t=T-2 to 0)
    for (let t = T - 2; t >= 0; t--) {
      for (const state of this.states) {
        let sum = 0;

        for (const nextState of this.states) {
          const obs = observationSequence[t + 1];
          sum +=
            this.transitionProb[state][nextState] *
            this.emissionProb[nextState][obs] *
            backward[t + 1][nextState];
        }

        backward[t][state] = sum;
      }
    }

    return {
      backwardTable: backward
    };
  }

  /**
   * Calculate probability of observation sequence
   * @param {string[]} observationSequence - Sequence of observations
   * @returns {number} Probability
   */
  calculateProbability(observationSequence) {
    const forward = this.forward(observationSequence);
    return forward.totalProbability;
  }

  /**
   * Get most likely state at time t given all observations
   * @param {string[]} observationSequence - Sequence of observations
   * @param {number} t - Time step
   * @returns {string} Most likely state
   */
  getMostLikelyStateAtTime(observationSequence, t) {
    const forward = this.forward(observationSequence);
    const backward = this.backward(observationSequence);

    let bestState = null;
    let bestProb = 0;

    for (const state of this.states) {
      const prob =
        forward.forwardTable[t][state] * backward.backwardTable[t][state];

      if (prob > bestProb) {
        bestProb = prob;
        bestState = state;
      }
    }

    return bestState;
  }
}

export default HiddenMarkovModel;
