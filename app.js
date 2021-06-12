const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const redis = require("redis");

const port = 3000;
let client = redis.createClient();
client.on("connect", () => {
  console.log("connect to redus");
});
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/get", (req, res, next) => {
  client.hgetall("user02", (err, obj) => {
    console.log(JSON.stringify( obj));
    res.send(JSON.stringify( obj))
  });
});
app.post("/add", (req, res, next) => {
  const {
    lastName,
    firstName,
    email,
    phoneNo,
    position,
    Company,
    UserName,
  } = req.body;
  console.log('req.body',req.body)
  client.hmset(
    "user4",
    [
      "firstName",
      firstName,
      "lastName",
      lastName,
      "email",
      email,
      "phoneNo",
      phoneNo,
      "Position",
      position,
      "Company",
      Company,
      "UserName",
      UserName,
    ],
    (err, reply) => {
      console.log("rply", reply);
      res.send("good");
    }
  );
});
app.listen(3001);
