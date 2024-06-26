import express from "express";

export const router = express.Router();

router.get('/', (req, res) => {res.send(`<h1>Queue Server</h1> <img src="https://i.pinimg.com/originals/28/8b/61/288b612b0a1481acc84c822458b056cb.gif"></img>`)})