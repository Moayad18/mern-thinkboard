import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONCTED SUCCESSFULY!");
  } catch (error) {
    console.error("Error connecting to DB", error);
    process.exit(1);
  }
};
