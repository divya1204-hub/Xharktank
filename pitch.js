import mongoose from "mongoose";

//components
import offer from "./offer.js";

const userSchema = new mongoose.Schema(
  {
    entrepreneur: {
      type: String,
      required: true,
    },
    pitchTitle: {
      type: String,
      required: true,
    },
    pitchIdea: {
      type: String,
      required: true,
    },
    askAmount: {
      type: Number,
      required: true,
    },
    equity: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    offers: {
      type: [offer.schema],
    },
  },
  {
    versionKey: false,
  }
);

const pitch = mongoose.model("pitch", userSchema);

export default pitch;
