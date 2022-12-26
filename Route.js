import express, { response } from "express";

//components
import Pitch from "../model/pitch.js";
import Offer from "../model/offer.js";

const route = express.Router();

route.post("/pitches", async (req, res) => {
  const neededKeys = [
    "entrepreneur",
    "pitchTitle",
    "pitchIdea",
    "askAmount",
    "equity",
  ];
  const newPitch = new Pitch(req.body);
  try {
    const response = await newPitch.save();
    res.status(201).json({ id: response._id });
  } catch (error) {
    if (
      req.body &&
      Object.keys(req.body).length === 0 &&
      Object.getPrototypeOf(req.body) === Object.prototype
    )
      res.status(400).json(error);
    else if (!neededKeys.every((key) => Object.keys(req.body).includes(key)))
      res.status(401).json(error);
    else res.status(402).json(error);
  }
});

route.post("/pitches/:id/makeOffer", async (req, res) => {
  const neededKeys = ["investor", "amount", "amount", "equity", "comment"];
  try {
    const exist = await Pitch.findById(req.params.id);

    if (exist) {
      const newOffer = new Offer(req.body);
      const response = await newOffer.save();

      await Pitch.findByIdAndUpdate(req.params.id, {
        $push: { offers: response },
      });
      res.status(201).json({ id: response._id });
    } else res.status(404).json("Pitch Not Found");
  } catch (error) {
    if (error.path) res.status(404).json(error);
    else if (
      req.body &&
      Object.keys(req.body).length === 0 &&
      Object.getPrototypeOf(req.body) === Object.prototype
    )
      res.status(400).json(error);
    else if (!neededKeys.every((key) => Object.keys(req.body).includes(key)))
      res.status(401).json(error);
    else res.status(402).json(error);
  }
});

route.get("/pitches", async (req, res) => {
  try {
    let pitches = await Pitch.find({});
    let obj = [];
    pitches.forEach((item, index) => {
      let temp = item.toObject();
      temp.id = temp._id;
      temp._id = undefined;
      temp.offers.forEach((offer) => {
        offer.id = offer._id;
        offer._id = undefined;
      });
      obj.push(temp);
    });
    obj.reverse();
    if (!obj.length) res.status(200).json(obj);
    else res.status(202).json(obj);
  } catch (error) {
    res.status(404).json(error);
  }
});

route.get("/pitches/:id", async (req, res) => {
  try {
    const pitch = await Pitch.findById(req.params.id);
    let obj = pitch.toObject();
    obj.offers.forEach((item) => {
      item.id = item._id;
      item._id = undefined;
    });
    obj._id = undefined;
    res.status(200).json({ ...obj, id: req.params.id });
  } catch (error) {
    res.status(404).json(error);
  }
});

export default route;
