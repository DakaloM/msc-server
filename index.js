const  express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require("multer");
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const categoryRoute = require('./routes/category');
const slideRoute = require('./routes/slide');
const postRoute = require('./routes/post');
const testimonyRoute = require('./routes/testimony');
const employeeRoute = require('./routes/employee');
const corsOptions = require('./config/corsOptions');


dotenv.config();

 

// // Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

// give the app the ability to use json
app.use(express.json()); 

app.use(cors(corsOptions))
// enable app to parse cookies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));




// End Points
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/slides", slideRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/testimonies", testimonyRoute);

// app.use("/api/relationships", relationshipRoutes);

const PORT = process.env.PORT || 5500



const startServer = async () => {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(`Sever running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();