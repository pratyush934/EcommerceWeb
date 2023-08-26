const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("app is working");
});

let port = 8080;
app.listen(port, () => {
  console.log(`the port ${port} is listening`);
});
