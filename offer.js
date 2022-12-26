import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    investor: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    equity: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const offer = mongoose.model("offer", userSchema);

export default offer;
