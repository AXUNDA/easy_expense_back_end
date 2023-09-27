import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.db as string);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
