import express from "express";
const app = express();
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import Buyer from "./models/Buyer.js";
import Product from "./models/Product.js";
import path from "path";
// import { send } from "process";
import { response } from "express";

//db connection

const connection_url =
  "mongodb+srv://fahadbashir1:123456fb@cluster0.ro2av.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to Database");
  })
  .catch((error) => {
    console.log("Cannot connect to DB : ", error);
  });

// middlewares
app.use(cors());
app.use(express.json());

//routes

app.post("/", (req, res) => {
  if (req.body.value === 1) {
    console.log("buyer data = ", req.body.buyer);
    const buyer = new Buyer({
      _id: new mongoose.Types.ObjectId(),
      key: req.body.buyer.key,
      balance: 0,
    });
    console.log(buyer.key);
    buyer
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({ msg: "successfully submitted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error occured" });
      });
  } else if (req.body.value === 2) {
    Buyer.findOne({
      key: req.body.buyer.key,
    }).then((BuyerExist) => {
      if (BuyerExist) {
        res.status(200).send(BuyerExist);
      } else {
        console.log("buyer not exist");
      }
    });
  }
});

/*app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fetch("https://api.prepaidforge.com/v1/1.0/findProductPage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // your expected POST request payload goes here
      page: 101,
      pageSize: 10,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Do some stuff ...
      console.log("dell");
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});*/

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fetch("https://api.prepaidforge.com/v1/1.0/findAllProducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Do some stuff ...
      console.log("dell");
      console.log(data);
      // res.send(data.slice(1000, 1040));
      res.send(data);
      /*Product.insertMany(data)
        .then((docs) => {})
        .catch((err) => {});*/
    })
    .catch((err) => console.log(err));
});

var token;

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

/*app.get("/", (req, res) => {
  console.log(token);
  try {
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
        console.log(data.apiToken);
        fetch("https://api.prepaidforge.com/v1/1.0/findStocks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-PrepaidForge-Api-Token": `${data.apiToken}`,
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
            response.send(error);
          });
      })
      .catch((error) => {
        // enter your logic for when there is an error (ex. error toast)
        res.send(error);
      });
  } catch {
    res.send("ERR: ");
  }
});*/
const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//app.listen(5000, () => console.log("Listening on port 5000"));
