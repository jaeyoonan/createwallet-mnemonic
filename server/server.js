const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
require("./db/mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// create routes

fs.readdirSync("./routes").map((r) => {
  app.use("/api", require("./routes/" + r));
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Sever is up on Port 3000");
});
