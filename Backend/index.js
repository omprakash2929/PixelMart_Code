import express from 'express';
// import colors from 'colors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import {fileURLToPath} from 'url'
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productsRoute.js'
import cors from 'cors'
import path from 'path';
//!Configuretion
dotenv.config();

//! filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Database connection
connectDB();


//*rest Objects
const app = express();

//! Middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "/dist")))



//! Backend  Deploye use only
// app.use('*', function(req, res){
//     res.sendFile(path.join(__dirname, '/dist/index.html'))
// })

//! API

app.get("/", (req, res) => {
    res.send("GET Request Called")
})

//!Routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)


//* PORT

const PORT = process.env.PORT || 8000 ;

//listeing

app.listen(PORT,()=>{
console.log(`Server is Running on ${PORT}`.bgGreen.white)
})