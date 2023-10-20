import express, { request } from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(222).send("Hello, world!");
});

app.use('/books', bookRouter);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Middleware for handling CORS Policy

// Allow all origins
app.use(cors());

// Allow specific origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
