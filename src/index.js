const crudRouter = require("./routes/crudRoutes");
const authRouter = require("./routes/authRoutes");

const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

mongoose
  .connect("mongodb://localhost/crud")
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

dotenv.config({ path: path.resolve(__dirname, "./.env") });

app.use(express.json());
app.use("/", crudRouter);
app.use("/", authRouter);

app.all("*", (req, res) => {
  res.send("Requested URL is not found");
});

app.listen(PORT, () => {
  console.log("Listening on port 5000...");
});
