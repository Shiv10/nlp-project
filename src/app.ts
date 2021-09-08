require('dotenv').config();
import express from 'express';
import { Request, Response } from 'express';
import predictRouter from './routes/predictRouter';
import reportRouter from './routes/reportRouter';

const app: express.Application = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response ) =>{
    res.send("test");
})
app.use('/predict', predictRouter);
app.use('/report', reportRouter);

app.listen(PORT, ()=> {
    console.log("Server is running.")
})