const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("././server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//log request
app.use(morgan("tiny"));

//db connection
connectDB();

//parse requests to body-parser -> req.body
app.use(bodyParser.urlencoded({ extended: "true" }));

//set view engine
app.set("view engine", "ejs");
// app.set('views',path.resolve(__dirname,'path/ejs'));

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));

//load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log("listening on ", PORT);
});
