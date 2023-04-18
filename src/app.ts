import express from "express";
const mongoose = require("mongoose");
import setRouter from "./router";

const app = express();
const port = 3000;
const url =
  "mongodb+srv://nplsbc99:sarojbc00@cluster0.uhwtam5.mongodb.net/?retryWrites=true&w=majority";

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setRouter(app);

mongoose.connect(url);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
