const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("sending get req");
  res.send("<h1>My tutorial</h1>");
});

const startServer = async () => {
  try {
    app.listen(3000, () => {
      console.log("server is listning");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
