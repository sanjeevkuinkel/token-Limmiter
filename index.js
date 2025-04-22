import express from "express";
import "dotenv/config";
import dbConnect from "./config/database.js";
import generateToken from "./routes/tokenGenerator.route.js";
import tokenLimmiter from "./services/tokenLimmiter.service.js";
const app = express();
dbConnect();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(generateToken);
app.use(tokenLimmiter);
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
