const app = (require("express"))()

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

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})