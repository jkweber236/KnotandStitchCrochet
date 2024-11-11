const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "KnotandStitchCrochet",
    description: "API for the Knot and Stitch Crochet E-Commerce Site",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
