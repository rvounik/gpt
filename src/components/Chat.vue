<script>
export default {
  data() {
    return {
      message: "",
      response: "",
    };
  },
  methods: {
    submitItem() {
      const inputs = encode(this.message.split(" "));
      console.log('inputs is now:',inputs);

      const output = gpt(inputs);
      this.response = encode(output)
    },
  },
};

const vocab = ["all", "not", "heroes", "the", "wear", ".", "capes"];

// const encodedString = encode(["the", "all"]);
const encode = (input) => {
  return input.map((i) => {
    return vocab.indexOf(i) || 0;
  });
};

// const decodedString = decode(encodedString);
const decode = (input) => {
  return input.map((i) => {
    return vocab[i];
  });
};

const argMax = (array) => {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
};

const gpt = (inputs) => {

  // const a= argMax(vocab);

  return inputs;
};

</script>

<template>
  <div>
    <h1 class="green">GPT frontend</h1>
    <form method="POST" action="" @submit.prevent="submitItem()">
      <input v-model="message" placeholder="say something" />
      <button type="submit">submit</button>
    </form>
    {{response}}
  </div>
</template>

<style scoped>
.green {
  color: blue;
}
h1 {
  font-size: 2.6rem;
}
</style>
