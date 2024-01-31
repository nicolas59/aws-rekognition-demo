const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

var AWS = require("aws-sdk");

const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const fs = require("fs");
const router = express.Router();

const app = express();
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors());
app.use(bodyParser.json());

const bucketName = process.env.BUCKET_NAME || "s3-eu-central-1-nro-image-rekognition";
const region = process.env.REGION || "eu-central-1";

var rekognition = new AWS.Rekognition({ region: region });
var s3 = new AWS.S3({ region: region });

app.post("/generate-signed-url", async function (req, res) {
  console.log("--- Generate signed url ----");
  res.setHeader("content-type", "application/json");
  if (!req.body.filename) {
    var msg = {
      err: "filename",
      message: "filename is required",
    };
    res.status(400).send(JSON.stringify(msg));
    return;
  }

  const filename = `${uuidv4()}-${req.body.filename}`;
  console.log(` filename : ${filename}`);

  const signedUrl = await s3.getSignedUrlPromise("putObject", {
    Bucket: bucketName,
    Key: filename,
  });

  /*const signedUrl = s3.createPresignedPost({
    Bucket: bucketName,
    Fields: {
      key: filename,
    },
    Conditions: [["content-length-range", 0, 10000000]],
  });*/

  var data = {
    filename: filename,
    signedUrl: signedUrl,
  };

  res.json(data);
});

app.get("/detect-labels/:filename", function (req, res) {
  console.log("----- Detect labels ---- ");
  console.log(req.params.filename);
  var params = {
    Image: {
      S3Object: {
        Bucket: bucketName,
        Name: req.params.filename,
      },
    },
    MaxLabels: 123,
    MinConfidence: 70,
  };
  rekognition.detectLabels(params, function (err, data) {
    if (err) res.status(500).send(err);
    else res.status(200).json(data);
  });
});

module.exports.handler = serverless(app);
/*const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/
