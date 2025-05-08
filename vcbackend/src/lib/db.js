import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.VC_MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("error in connecting to MongoDb", error)
        console.exit(1);
    }
}