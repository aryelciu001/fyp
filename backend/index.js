// Configure environment variables
require('dotenv').config()

// Configure express server
const app = (require("express"))()

// Connect to mysql db
const connection = require('./db')

try {
  connection.connect(() => console.log("Connected to DB"))
} catch (e) {
  console.log(e)
}

// Routing
app.get("/", (req, res) => {
  res.send("Server is up")
})
const auth = require("./routes/auth")
const admin = require("./routes/admin")
const project = require("./routes/project")
const student = require("./routes/student")
const supervisor = require("./routes/supervisor")
app.use("/auth", auth)
app.use("/admin", admin)
app.use("/project", project)
app.use("/student", student)
app.use("/supervisor", supervisor)

// Spin up server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})