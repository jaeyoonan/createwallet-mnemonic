const mongoose = require("mongoose");
mongoose
  .connect(process.env.DBURL, { useNewURLParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
