const mongoose = require('mongoose');

require('dotenv').config();


exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("CONNECTED TO DB"))
    .catch((err) => {console.log("CANNOT CONNECT TO DB")})
}


