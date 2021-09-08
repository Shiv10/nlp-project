require('dotenv').config();
import express from 'express';
import { Request, Response } from 'express';

const app: express.Application = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response ) =>{
    res.send("test");
})

app.listen(PORT, ()=> {
    console.log("Server is running.")
})