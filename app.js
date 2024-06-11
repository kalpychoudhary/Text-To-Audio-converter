

const qs = require("querystring");
const https = require("https");

const options = {
  method: "POST",
  hostname: "voicerss-text-to-speech.p.rapidapi.com",
  port: null,
  path: "/?key=7e3eb02263804bc3a670dfaa5c91a75e",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "aebbc8b5d7msh2c686e3a9f61d4fp17591cjsncba2b7c45f15",
    "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
    useQueryString: true,
  },
};

const express = require("express");
const app = express();

const port = process.env.PORT || 209;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/tts", function (req, res) {
  const text = req.query.text;
  const audioOptions = {
    ...options,
    path:
      "/?key=7e3eb02263804bc3a670dfaa5c91a75e&src=" +
      encodeURIComponent(text) +
      "&hl=en-us&r=0&c=mp3&f=8khz_8bit_mono",
  };

  const audioReq = https.request(audioOptions, function (audioRes) {
    const audioChunks = [];

    audioRes.on("data", function (chunk) {
      audioChunks.push(chunk);
    });

    audioRes.on("end", function () {
      const audioBuffer = Buffer.concat(audioChunks);
      res.writeHead(200, { "Content-Type": "audio/mpeg" });
      res.end(audioBuffer);
    });
  });

  audioReq.on("error", function (error) {
    console.error(error);
  });

  audioReq.end();
});

app.listen(port, function () {
  console.log("Server started on port " + port);
});

// client-side code





