const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const { check, validationResult } = require("express-validator");
mongoose.connect(
  "mongodb://localhost:27017/posteaserContact",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      console.log("Error!" + error);
    }
  }
);
const app = express();
const port = 3000;

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  desc: String,
});
const Contact = mongoose.model("Contact", contactSchema);

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post(
  "/contact",
  [
    check("email", "Please Enter Valid emailId").isEmail(),
    check("name", "Name length should be 2 to 20 characters").isLength({
      min: 2,
      max: 20,
    }),
    check("desc", "Desc length should be 2 to 250 characters").isLength({
      min: 2,
      max: 250,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let myData = new Contact(req.body);
    myData
      .save()
      .then(() => {
        res.send("This item has been saved to the database");
      })
      .catch((err) => {
        res.status(400).send("this item is not saved");
      });
  }
);

app.listen(port, () => {
  console.log(`The application started succesfully on port 
    ${port}`);
});
