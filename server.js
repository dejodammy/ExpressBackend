const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/product.model.js");

app.set("view engine", "ejs");

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.gdks7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });

app.get("/", (req, res) => {
  console.log("dejodammy");
  res.download("server.js");
  res.render("index", { text: "world" });
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);
