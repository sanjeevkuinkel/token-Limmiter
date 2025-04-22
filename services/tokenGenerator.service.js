import { encode } from "gpt-3-encoder";
const generateToken = async (req, res) => {
  const inputText = req.body.text;
  async function countTokens(text) {
    // Tokenize the input text
    const tokens = encode(text);
    // Return the number of tokens
    return tokens.length;
  }

  const totalTokens = await countTokens(inputText);
  res.send({ message: "Total token is ", totalTokens });
};
export default generateToken;
