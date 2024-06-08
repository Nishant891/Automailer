import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { router } from '../route/router'; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://127.0.0.1:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
};

app.use(cors(corsOptions));
app.use(router);

//const PORT = parseInt(process.env.PORT || '5000', 10);
const PORT = 5000

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});

