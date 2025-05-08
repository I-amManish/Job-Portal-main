import express from 'express';
import "dotenv/config"

import authRoutes from "./routes/auth.routes.js"
import { connectDB } from './lib/db.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    connectDB()
});