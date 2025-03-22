const express = require('express');

const router = require("./routes/route");
const app = express();
require('dotenv').config();
app.use(express.json());

const PORT = process.env.port;
console.log(PORT);
require('./config/database').connect();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use("/base", router);

app.listen(PORT, () =>{
    console.log("SERVER STARTED");
})


