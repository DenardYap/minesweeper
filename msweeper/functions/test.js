// require("dotenv").config({ path: ".env" });
// // console.log(process.env.SECRET_KEY);
// var CryptoJS = require("crypto-js");
// let data = "BERNARD";
// let key = process.env.SECRET_KEY;
// let iv = CryptoJS.enc.Base64.parse("");

// function encryptData(data, iv, key) {
//   if (typeof data == "string") {
//     // data = data.slice();
//     let encryptedString = CryptoJS.AES.encrypt(data, key, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
//     return encryptedString.toString();
//   } else {
//     let encryptedString = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
//     return encryptedString.toString();
//   }
// }

// function decryptData(encrypted, iv, key) {
//   let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }

// let encryptedString = encryptData(data, iv, key);
// console.log(encryptedString);

// let alteredData = "U2FsdGVkX19n7xrcqt1JmF0l1xBi9UNDXdRZ0T/aan4=";
// // let decryptedString = decryptData(alteredData, iv, key);
// let decryptedString = decryptData(encryptedString, iv, key);
// // console.log(decryptedString);
// // var encryptedString = encryptData(data, iv, key);
// console.log(encryptedString); //genrated encryption String:  swBX2r1

// Encrypt
// var ciphertext = CryptoJS.AES.encrypt(
//   // JSON.stringify(data),
//   data,
//   "secret key 123"
// ).toString();

// Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");

// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

// console.log(decryptedData); // [{id: 1}, {id: 2}]

const jwt = require("jsonwebtoken");
var token = jwt.sign(
  { name: "bernard yap", uid: "1234", maxAge: "300" },
  "shhhhh"
);

console.log(token);

jwt.verify(token, "shhhhah", (err, decoded) => {
  console.log(decoded);
});

console.log(jwt.decode(token));

console.log(JSON.stringify({ uid: "asdasd" }));
