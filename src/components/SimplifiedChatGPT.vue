<script>
import vocab from "./../assets/vocab/dict1.js";

export default {
  data() {
    return {
      message: "",
      response: "",
    };
  },
  methods: {
    submitItem() {
      this.response = "";

      this.updateResponse()

      // old tokenized implementation:
      // const inputs = encode(this.message.split(" "));
      // const output = gpt(inputs);
      // this.response = encode(output)
    },
    updateResponse() {

      // only look at the last word of the input. when the vocab size is large enough this can be adapted
      let input = this.message.split(' ')[this.message.split(' ').length - 1].trim();

      if (this.response) {
        input = this.response.split(' ')[this.response.split(' ').length - 1].trim();
      }

      const predictedWord = predictNextWord(input, vocab);

      if (!predictedWord || predictedWord.substr(predictedWord.length - 1, 1) === ".") {
        this.response = this.response + '.';
      } else {
        this.response = this.response + ' ' + predictedWord;

        // get next word (remember GPT is a word predictor in the most basic sense)
        setTimeout(() => {
          this.updateResponse(this.response)
        }, 250);
      }
    }
  },
};

// uses simplified Markov chain model
const predictNextWord = (previousWord, wordArray) => {
  const nextWordCounts = {};

  for (let i = 0; i < wordArray.length - 1; i++) {
    if (wordArray[i] === previousWord) {
      const nextWord = wordArray[i + 1];

      if (!nextWordCounts[nextWord]) {
        nextWordCounts[nextWord] = 1;
      } else {
        nextWordCounts[nextWord]++;
      }
    }
  }

  const nextWordWeights = [];
  let totalWeight = 0;

  for (const [word, count] of Object.entries(nextWordCounts)) {
    nextWordWeights.push({
      word,
      weight: count
    });

    totalWeight += count;
  }

  let selectedWord = null;

  // todo: forget this randomness for now, its not giving good results
  // let randomWeight = (totalWeight - totalWeight / 10 + Math.random(totalWeight / 10)).toFixed(0);

  const randomNess = 5; // the higher, the more random responses you'll get
  let randomWeight = totalWeight / randomNess + (Math.random() * totalWeight / randomNess);

  for (const nextWord of nextWordWeights) {
    randomWeight -= nextWord.weight;
    if (randomWeight <= 0) {
      selectedWord = nextWord.word;
      break;
    }
  }

  return selectedWord;
};

// // const encodedString = encode(["the", "all"]);
// const encode = (input) => {
//   return input.map((i) => {
//     return vocab.indexOf(i) || 0;
//   });
// };
//
// // const decodedString = decode(encodedString);
// const decode = (input) => {
//   return input.map((i) => {
//     return vocab[i];
//   });
// };
//
// const argMax = (array) => {
//   return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
// };
//
// const gpt = (inputs) => {
//   const a = argMax(vocab);
//
//   return inputs;
// };

</script>

<template>
    <h1>Simplified ChatGPT implementation</h1>
    <form method="POST" action="" @submit.prevent="submitItem()">
      <input v-model="message" placeholder="say something" />
      <button type="submit">submit</button>
    </form>
    <p class="output">
      {{ response }}
    </p>
</template>

<style scoped>
body {
  font-family: Arial, serif;
  font-size: 16px;
}

h1 {
  font-family: Arial, serif;
  color: black;
  font-size: 2rem;
  margin-bottom: 2rem;
}

input {
  padding: .5rem;
  margin-right: .5rem;
}

button {
  background: black;
  color: white;
  padding: .5rem 1rem;
  border-radius: .25rem;
}

p {
  width: 100%;
  box-sizing: border-box;
}

p::first-letter {
  text-transform: uppercase;
}
</style>
