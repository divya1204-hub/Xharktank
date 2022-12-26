import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

//components
import Connection from "./database/db.js";
import Routes from "./routes/Route.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Routes);

const PORTUSED = 8081;

Connection();

app.listen(PORTUSED, () =>
  console.log(`The server is running successfully on PORT ${PORTUSED}`)
);
