//Starter version of the main app.js file
"use strict";
const express = require("express");
const app = express();
const port = process.env.port || 4444;

app.get("/", (reqapp, resapp) => {

  request('http://api.moloni.pt/v1/grant/?grant_type=refresh_token&client_id=winxgroup&client_secret=a8156283c4aa7866e1a2f8bf4737d0ca16e59af9&refresh_token=9b54a94c5729d4199a71d98f862a60026459e922', function (error, response, body) {
    resapp.send(body);
  });
        
      });

app.listen(port, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});

