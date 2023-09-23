// Import the OpenAI
const { Configuration, OpenAIApi } = require("openai");

// Create a new OpenAI API key and paste it here
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = openai;
