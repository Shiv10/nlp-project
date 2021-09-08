import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    // this router will be used for prediction using machine learning model
    res.status(200);
});