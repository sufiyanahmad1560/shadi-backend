import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("[DATABASE] : Connected with DB")
    } catch (error) {
        console.log("[ERROR] : Error connecting with DB")
        process.exit(1);
    }
}