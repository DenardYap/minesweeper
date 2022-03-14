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
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    // allowedHeaders: ["Content-Type", "Authorization"],
    // methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// some middleware for testing with localhost
// let allowCrossDomain = function (req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "https://msweeper.com");
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Authorization, content-type");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
//   res.header("Cache-Control", "private");
//   next();
// };
// app.use(allowCrossDomain);
app.use(cookieParser());

const serviceAccount = JSON.parse(process.env.CREDENTIALS);
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const leaderboard = [];

// first load data from the database, then put it on rest endpoint /leaderboard
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

// Return all leaderboard data
app.get("/", async (req, res) => {
  if (leaderboard.length == 0) {
    await load_data();
  }
  if (req.headers.authorization == process.env.API_KEY) {
    return res.status(200).json(leaderboard);
  } else {
    return res.status(403).json({ message: "unauthorized" });
  }
});

// Update REST leaderboard data if someone breaks the record
app.post("/", async (req, res) => {
  if (req.headers.authorization == process.env.API_KEY) {
    leaderboard.forEach((l, index) => {
      if (l.mode === req.body.mode) {
        leaderboard[index] = req.body;
        return res.status(200).json({ message: "success" });
      }
    });
  } else {
    return res.status(403).json({ message: "unauthorized" });
  }
});

// when a new signup is detected, this end point is called
// and a cookie is set for the client
app.post("/signup", (req, res) => {
  console.log("cookies from sign up route", req.cookies);
  // Authorize with API_KEY...
  console.log("signing in...");
  if (req.headers.authorization == process.env.API_KEY) {
    // Get the ID token passed and the CSRF token.
    const idToken = req.body.idToken;
    console.log(idToken);
    // const csrfToken = req.body.csrfToken.toString();
    // // Guard against CSRF attacks.
    // if (csrfToken !== req.cookies.csrfToken) {
    //   return res.status(401).send("UNAUTHORIZED REQUEST!");
    // }
    // Set session expiration to 14 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          console.log("Creating cookies...", sessionCookie);
          // Set cookie policy for session cookie.
          const options = { maxAge: expiresIn, httpOnly: true, secure: true };
          res.cookie("__session", sessionCookie, options);
          console.log("cookies freshly baked..!");
          return res.end(JSON.stringify({ message: "success" }));
        },
        (error) => {
          return res.status(401).send("UNAUTHORIZED REQUEST!");
        }
      );
  } else {
    return res.status(401).send("UNAUTHORIZED REQUEST!");
  }
  // req.body should be a json object containing the UID
  // sign it with our SECRET_KEY, then set the cookie
  // jwt.sign(req.body, process.env.SECRET_KEY, (err, token) => {
  // const expiresIn = 1000 * 60 * 60 * 24 * 14;
  // admin.auth().createSessionCookie(token, {expiresIn})
  // .then(
  //   (sessionCookie) => {
  //     const options = {maxAge: expiresIn, httpOnly: true}; //todo set strict and prevent CSRF
  //     res.cookie("session", sessionCookie, options);
  //     res.end(JSON.stringify({message:"success"}));
  //   }
  // )

  //     console.log("signing in 2...");
  //     if (!err) {
  //       console.log("signing in 3...");
  //       res.cookie("__session", token, {
  //         maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
  //         //TODO: Test maxAge
  //         //TODO 2: add secure, and CSRF prevention stuff like that
  //         httpOnly: true,
  //       });
  //       console.log("signing in 4...");
  //       return res.status(200).json({ message: "success" });
  //     }
  //     console.log("failed to sign in...");
  //     res.status(403).json({ message: "unauthorized" });
  //     return res.send("success");
  //   });
  // } else {
  //   console.log("failed to sign in 2...");
  //   res.status(403).json({ message: "unauthorized" });
  //   return res.send("failed");
  // }
});

// just for testing, commented out for deployment
// app.get("/test", async (req, res) => {
// });

// If a cookie is present, we take the content and post
// it to this endpoint, parse it with our secret key,
// if success, return the decoded jwt token, which should
// be an UID. Later on, this UID will be useful for
// retrieving information from the database
app.get("/login", async (req, res) => {
  if (req.headers.authorization == process.env.API_KEY) {
    const token = req.cookies.__session;
    console.log("logging in...");
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      // If verified, display the decoded UID
      console.log("logging in 2...");
      if (decoded) {
        console.log("logging in 3...");
        return res.status(200).json(decoded);
      } else if (err || !decoded) {
        console.log("failed to log in");
        return res.status(403).json({ message: "unauthorized" });
      }
    });
  }
  // We deny requests when
  // - not the right header authorization token
  // - not the right JWT secret key
  // both cases indicate there's people wiht malicious intents
  else {
    console.log("failed to log in 2");
    return res.status(403).json({ message: "unauthorized" });
  }
});

app.delete("/delete", async (req, res) => {
  console.log("deleting...");
  if (req.headers.authorization == process.env.API_KEY) {
    try {
      console.log("deleting 2 ...");
      res.clearCookie("__session");
      return res.status(200).json({ message: "success" });
    } catch (err) {
      console.log("failed to delete...");
      console.log("Can't delete cookie for some reason");
      return res.status(404).json({ message: "failed" });
    }
  } else {
    console.log("failed to delete 2...");
    return res.status(403).json({ message: "unauthorized" });
  }
});
// app.listen(8080, () => {
// console.log("successfully connected");
// });
exports.leaderboard = functions.https.onRequest(app);
