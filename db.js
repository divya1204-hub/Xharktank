import mongoose from "mongoose";

// const mongoose = require("mongoose");

const Connection = async () => {
  const uri = "mongodb://localhost:27017/xharktank";

  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connectiong to mongodb", error);
  }
};

export default Connection;