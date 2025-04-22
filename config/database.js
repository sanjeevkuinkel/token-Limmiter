import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongodb database connected Successfully.`);
  } catch (error) {
    console.log(`Error Occured `, +error);
  }
};
export default dbConnect;
