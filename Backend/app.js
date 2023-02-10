const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
// require("./db/connection");
const userRouter = require("./routes");


const app = express();
app.use(cors());
PORT = process.env.PORT || 3004;

app.use(logger("dev"));
app.use(express.json());


// app.use("/uploads", express.static("./uploads"));
app.use("/api", userRouter);
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/FileExplorer")
    .then(res => `Mongoose connoted to db successfully ${res}`)
    .catch(err => console.log('Mongoose connection to db is get failed. Try again'));

app.listen(PORT, () => {
    console.log(`Server is started on ${PORT}`)
});

