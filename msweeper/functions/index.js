const functions = require("firebase-functions");
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ data: "hello world" });
});

app.get("/butterfly", (req, res) => {
  res.status(200).send("AIYAIYAI");
});

exports.app = functions.https.onRequest(app);

// const admin = require("firebase-admin");
// admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });
