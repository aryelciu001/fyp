require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = require("./db");
// const logger = require('./utils/logger')

connection.on("connection", function (connection) {
  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
});

// Routing
app.get("/", (req, res) => {
  res.send("Server is up");
});
const auth = require("./routes/auth");
const reservation = require("./routes/reservation");
const project = require("./routes/project");
const user = require("./routes/user");
const selectioninfo = require("./routes/selectioninfo");
const selection = require("./routes/selection");
app.use("/auth", auth);
app.use("/reservation", reservation);
app.use("/project", project);
app.use("/user", user);
app.use("/selectioninfo", selectioninfo);
app.use("/selection", selection);

// Spin up server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
