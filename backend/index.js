const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const app = express();

// app.get("/", (req, res) => {
//   res.send("app is working");
// });

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  // resp.send(result);
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "SOMETHING WENT WRONG" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  // console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "SOMETHING WENT WRONG" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "NO USER FOUND" });
    }
  } else {
    resp.send({ result: "NO USER FOUND" });
  }
});

app.post("/add-product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
    // console.log(products);
  } else {
    resp.send({ result: "No Products Found" });
  }
});

app.delete("/product/:id", verifyToken,async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(req.params.id);
});

app.get("/product/:id", verifyToken, async (req, resp) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });

    if (result) {
      resp.send(result);
      // console.log(result);
    } else {
      resp.status(404).send({ result: "No record found" });
    }
  } catch (error) {
    resp.status(500).send({ error: "Internal server error" });
  }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
  // console.log(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // console.warn("middleware called", token);
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send("Please add valid token");
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send("Kindly add token with header");
  }
  // console.warn("middleware called", token);
  // next();
}

let port = 8080;
app.listen(port, () => {
  console.log(`the port ${port} is listening`);
});
