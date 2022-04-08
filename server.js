import express from "express";
const app = express();
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import Buyer from "./models/Buyer.js";
import Product from "./models/Product.js";
import Country from "./models/Country.js";
import Currency from "./models/Currency.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import jwt from "jsonwebtoken";
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
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 5,
    },
  })
);
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
        const token = jwt.sign({ userId: BuyerExist._id }, "talhakhan", {
          expiresIn: "1h",
        });
        res.status(200).send({ BuyerExist, token });
      } else {
        console.log("buyer not exist");
      }
    });
  } else if (req.body.value === 3) {
    Country.findOne({ brand: req.body.brand }).then((res1) => {
      Currency.findOne({ brand: req.body.brand, country: res1.names[0] }).then(
        (res2) => {
          const data = {
            countries: res1.names,
            curr: res2,
          };
          res.status(200).send(data);
        }
      );
    });
    /* Country.findOne({ brand: req.body.brand }).then((res1) => {
      res1.names.forEach((element) => {
        var curr = [];
        Product.find({ brand: req.body.brand, countries: element }).then(
          (res2) => {
            res2.forEach((element2) => {
              if (curr.indexOf(element2.faceValue.price) === -1)
                curr.push(element2.faceValue.amount);
            });
            curr = curr.sort(function (a, b) {
              return a - b;
            });
            const temp = new Currency({
              _id: new mongoose.Types.ObjectId(),
              brand: req.body.brand,
              country: element,
              code: res2[0].faceValue.currency,
              price: curr,
            });

            temp
              .save()
              .then((result) => {
                console.log(result);
                // res.status(200).json({ msg: "successfully submitted" });
              })
              .catch((err) => {
                console.log(err);
                //res.status(500).json({ msg: "error occured" });
              });
          }
        );
      });
      //res.status(200).send(res1.names);
    });
     var country = [];
    Product.find().then((res1) => {
      if (res1) {
        res1.forEach((element) => {
          if (
            element.brand === req.body.brand &&
            country.indexOf(element.countries[0]) === -1
          )
            country.push(element.countries[0]);
        });
      }
      const countryy = new Country({
        _id: new mongoose.Types.ObjectId(),
        brand: req.body.brand,
        names: country,
      });

      countryy
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({ msg: "successfully submitted" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ msg: "error occured" });
        });
      // res.status(200).send(country);
    });*/

    /*console.log("found");
    console.log(req.body);
    Product.findOne({
      brand: req.body.brand,
      amount: req.body.amount,
      currency: req.body.currency,
    }).then((BuyerExist) => {
      if (BuyerExist) {
        console.log("found");
        console.log(BuyerExist.countries);
        console.log(BuyerExist);
        res.status(200).send(BuyerExist.countries);
      } else {
        console.log("buyer not exist");
      }
    });*/
  } else if (req.body.value === 4) {
    Currency.findOne({ brand: req.body.brand, country: req.body.country }).then(
      (res2) => {
        res.status(200).send(res2);
      }
    );
  } else if (req.body.value === 5) {
    Product.findOne({
      brand: req.body.brand,
      countries: req.body.country,
      currencyCode: req.body.code,
      faceValue: req.body.price,
    }).then((res2) => {
      fetch("https://api.prepaidforge.com/v1/1.0/findStocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PrepaidForge-Api-Token": req.body.apitoken,
        },

        body: JSON.stringify({
          types: ["TEXT", "SCAN"],
          skus: [res2.sku],
        }),
      })
        .then((response) => response.json())
        .then((data1) => {
          // enter you logic when the fetch is successful
          // var stocks = groupBy("skus", data);
          var temp = [];
          data1.forEach((element) => {
            if (element.quantity != 0) temp.push(element);
          });
          temp = temp.sort(function (a, b) {
            return a.purchasePrice - b.purchasePrice;
          });
          res.send(temp[0]);
        })
        .catch((error) => {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error);
          res.send(error);
        });

      //res.status(200).send(res2);
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

/*app.get("/", (req, res) => {
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
      Product.insertMany(data)
        .then((docs) => {})
        .catch((err) => {});
    })
    .catch((err) => console.log(err));
});*/

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
      console.log(data.apiToken);
      res.send(data);
    })
    .catch((error) => {
      // enter your logic for when there is an error (ex. error toast)
      res.send(error);
    });
});
const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//app.listen(5000, () => console.log("Listening on port 5000"));
