import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_DEV_URI);
    if (conn) {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      console.log(`Mongo Connection Error.`);
    }
  } catch (error) {
    console.log("MongoDB Connection Error: ", error);
  }
};
