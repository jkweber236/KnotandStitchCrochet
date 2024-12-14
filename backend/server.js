const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/", require("./routes"));

app.use(express.static('frontend/public'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});
