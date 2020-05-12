var express = require("express");
var app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//use cors to allow cross origin resource sharing
app.use("/prof_pic", express.static("public/uploads"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const { checkAuth, frontendURL } = require("../backend/Utils/config");

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", frontendURL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const { mongoDB } = require("./Utils/config");
const mongoose = require("mongoose");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

const multer = require("multer");

storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${new Date()}-${file.fieldname}.${file.mimetype.split("/")[1]}`);
  },
});

upload = multer({ storage });

app.post("/files", upload.single("file"), (req, res) => {
  console.log("Req Body : ", req.body);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(`${new Date()}-${req.body.name}`);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3001, () => {
  console.log("GraphQL server started on port 3001");
});
