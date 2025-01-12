const mongoose = require('mongoose');

require('dotenv').config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {console.log("Connected to Database")})
    .catch((error) => {
        console.error(error);
        console.log("DATABASE Cannot be Connected");
        process.exit(1);
    });
}