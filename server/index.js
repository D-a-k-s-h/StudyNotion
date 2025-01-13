const express = require('express');
const userRoutes = require('./routes/routes');
const profileRoutes = require('./routes/profileRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const {dbConnect} = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"https://study-notion-kohl-pi.vercel.app",
        credentials:true
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
)

PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server connected to PORT: ${PORT}`);
})

//cloudinary connect
cloudinaryConnect();

app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/payment',paymentRoutes);

//database connect
dbConnect();

app.use("/",(req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})