import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT | 5000
const MONGOURL = process.env.MONGO_URL

app.get('/', (req, res) => {
    res.send('hello world')
})

mongoose.connect(MONGOURL).then(() => {
    console.log("Connected to Mongodb Database")
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(error => console.log(`Error connecting to MongoDB: ${error}`));


app.use("api/user", route)  