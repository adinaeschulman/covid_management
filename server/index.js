const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

const app = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", routes); // Mount the router at the root level

// start server
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
