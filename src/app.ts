
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as bodyparser from 'body-parser';
import cors from 'cors';
import { connectToDatabase } from "./utils/database";
import { timeStamp } from "console";
import authRouter from "./routes/auth.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(bodyparser.json());
app.use(cors())

app.use('/api', authRouter);

app.get('/health', (req: Request, res: Response) => {
    const message = `Server is running at ${port}`;
    const timestamp = new Date().toLocaleString();
    res.status(200).send({ message, timestamp });
});


(async () => {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        throw new Error(`[ERROR]: Couldn't start server`)
    }
}
)();