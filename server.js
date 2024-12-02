import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./config/connectDb.js";
import  userRoutes from "./routes/userRoute.js";
import transactionRoutes from "./routes/transactionRoute.js";



//rest object
const app = express();

//config dot env file
dotenv.config();

connectDb();




//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//user routes
app.use("/api/v1/users", userRoutes);

//transaction routes
app.use('/api/v1/transactions', transactionRoutes );

//port
const PORT = 8080 || process.env.PORT;

//listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});