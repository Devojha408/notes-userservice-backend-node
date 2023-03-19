require("dotenv").config();
var cors = require('cors')
const express = require("express");
const app = express();
const userRouter = require("./users/user.router");
const notesRouter = require("./users/notes.router");

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/notes", notesRouter);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});