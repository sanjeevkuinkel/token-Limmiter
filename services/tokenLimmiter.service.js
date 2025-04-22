import { ChatPromptTemplate } from "@langchain/core/prompts";

import { encode } from "gpt-3-encoder";
import model from "../config/gemini.js";
const tokenLimmiter = async (req, res) => {
  const inputText = req.body.text;
  //   console.log(inputText);
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant"],
    ["user", inputText],
  ]);
  const chain = promptTemplate.pipe(model);
  const response = await chain.invoke({
    inputText,
  });
  //   console.log(response.content);
  const responseOutput = response.content;
  // Define token limits
  const inputTokenLimit = 500; // Max tokens for input text
  const outputTokenLimit = 500; // Max tokens for output text

  // Function to tokenize the text and count the tokens
  const countTokens = (inputText) => {
    const tokens = encode(inputText);
    return tokens.length;
  };

  // Function to process input and output tokens
  const processTokens = (inputText, responseOutput) => {
    // console.log(inputText);
    const inputTokenCount = countTokens(inputText);
    const outputTokenCount = countTokens(responseOutput);

    // console.log("Input Token Count:", inputTokenCount);
    // console.log("Output Token Count:", outputTokenCount);

    // Calculate total token count
    const totalTokens = inputTokenCount + outputTokenCount;
    // console.log("Total Token Count:", totalTokens);

    // Check if token limits are exceeded
    if (inputTokenCount > inputTokenLimit) {
      return res.send({
        message: "Input token limit exceeded. Please shorten your input.",
      });
    } else if (outputTokenCount > outputTokenLimit) {
      return res.send({
        message: "Output token limit exceeded. Please shorten the response.",
      });
    } else {
      return res.json({
        message: "Token usage is within the limits.",
        totalTokens,
        inputTokenLimit,
        inputTokenCount,
        outputTokenLimit,
        outputTokenCount,
        response: responseOutput,
      });
    }
  };
  const totalTokens = processTokens(inputText, responseOutput);
  //   console.log("Final Total Tokens:", totalTokens);
};
export default tokenLimmiter;
