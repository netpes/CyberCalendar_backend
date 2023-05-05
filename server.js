const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const port = process.env.PORT || 2000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const classes = require("./routes/class");
const users = require("./routes/user");
require("dotenv").config();
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", classes);
app.use("/", users);



// mongo connection
mongoose.set("strictQuery", true);
const url = process.env.MONGO_DB;
mongoose?.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose?.connection.on("connected", () => {
    console.log("connected");
});



http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
