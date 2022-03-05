// require("dotenv").config({ path: "../.env.local" });
require("dotenv").config();

//TODO: bug to be fixed can't deploy

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const functions = require("firebase-functions");
const express = require("express");
// const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

const serviceAccount = JSON.parse(process.env.CREDENTIALS);
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const leaderboard = [];

async function load_data() {
  const queryData = await db.collection("leaderboard_test").get();
  queryData.forEach((doc) => {
    const documentData = doc.data();
    leaderboard.push({
      index: documentData.index,
      mode: doc.id,
      rank: documentData.rank,
    });
  });
}

app.get("/", async (req, res) => {
  // check authentication (? maybe)
  if (leaderboard.length == 0) {
    await load_data();
  }
  console.log(process.env.REACT_APP_API_KEY);
  if (req.headers.authorization == process.env.API_KEY) {
    res.status(200).json(leaderboard);
  } else {
    res.status(403).json({ message: "unauthorized" });
  }
});

app.post("/", async (req, res) => {
  if (req.headers.authorization == process.env.API_KEY) {
    leaderboard.forEach((l, index) => {
      if (l.mode === req.body.mode) {
        leaderboard[index] = req.body;
      }
    });
  } else {
    res.status(403).json({ message: "unauthorized" });
  }
});

// app.listen(8080, () => {});
exports.leaderboard = functions.https.onRequest(app);
