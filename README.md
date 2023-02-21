# Simplified ChatGPT model using VueJS and Vite

The initial idea was to write a language model based on the work outlined here:

https://jaykmody.com/blog/gpt-from-scratch/#gpt-architecture

But that turned out to be overly complex so I choose instead to do a simple probability lookup based on a sample text.

This is just to understand the very basics of ChatGPT (and VueJS). It is a one-word lookup that gives very random,
unpredictable responses. This is partly due to the small dictionary.

![Alt text](/src/assets/images/screenshot.png?raw=true "screenshot")

# To run the project:

- yarn install
- yarn run dev

now fill in a text and notice how a response is formed (as long as it recognises the word you used)

# Extend the dictionary:

if you want to add more words to the model, you can paste a raw text into example.txt and use learn.html to convert
it to an array which can be copied to the assets/vocab/ folder. Don't forget to import it afterwards.
