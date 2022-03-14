const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
app.use(cors());

/*app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("hello1");
  fetch("https://api.prepaidforge.com/v1/1.0/findAllProducts", {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
    },
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      // Do some stuff ...
      console.log("dell");
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

app.post("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("hello2");
  fetch("https://api.prepaidforge.com/v1/1.0/signInWithApi", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: {
      data: {
        email: "Worldofprodiverse@gmail.com",
        password: "Bravo1?@1",
      },
    }
      .then(function (res) {
        console.log("post");
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      }),
  });
});*/

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/build/index.html"));
});
app.use(express.static(path.join(__dirname, "/public/build")));

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//app.listen(5000, () => console.log("Listening on port 5000"));
