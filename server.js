import express from "express";
const app = express();
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
app.use(cors());

/*app.get("/signin", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("hello1");

  fetch("https://api.prepaidforge.com/v1/1.0/findProductPage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // your expected POST request payload goes here
      page: 369,
      pageSize: 10,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Do some stuff ...
      console.log("dell");
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});*/

var token;

app.get("/signin", (req, res) => {
  fetch("https://api.prepaidforge.com/v1/1.0/findStocks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PrepaidForge-Api-Token": token,
    },

    body: JSON.stringify({
      types: ["TEXT", "SCAN"],
      skus: ["iTunes-300-RUB-RU"],
    }),
  })
    .then((response) => response.json())
    .then((data1) => {
      // enter you logic when the fetch is successful
      // var stocks = groupBy("skus", data);
      console.log("hello22");
      console.log(data1);
      response.send(data1);
    })
    .catch((error) => {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    });
});
/*app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/build/index.html"));
});
app.use(express.static(path.join(__dirname, "/public/build")));*/

function groupBy(key, array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var added = false;
    for (var j = 0; j < result.length; j++) {
      if (result[j][key] == array[i][key]) {
        result[j].items.push(array[i]);
        added = true;
        break;
      }
    }
    if (!added) {
      var entry = { items: [] };
      entry[key] = array[i][key];
      entry.items.push(array[i]);
      result.push(entry);
    }
  }
  return result;
}

app.get("/", (req, res) => {
  console.log(token);
  fetch("https://api.prepaidforge.com/v1/1.0/signInWithApi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // your expected POST request payload goes here
      email: "Worldofprodiverse@gmail.com",
      password: "Bravo1?@1",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // enter you logic when the fetch is successful
      // var stocks = groupBy("skus", data);
      console.log("hello");
      token = data.apiToken;
      console.log(token);
    })
    .catch((error) => {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    });
});
console.log(token);
const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//app.listen(5000, () => console.log("Listening on port 5000"));
