import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "tibiane",
      appName: "tibiane",
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
}
