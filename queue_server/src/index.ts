import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { router } from '../route/router'; 
import { addToQueue } from './producer';
import { startWorker } from './worker';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*const corsOptions = {
    origin: 'http://127.0.0.1:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
};*/

app.use(cors());
app.use(router);

const PORT = 8000

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Queue server online on port ${PORT}`);
    //addToQueue();
    //startWorker();
});

