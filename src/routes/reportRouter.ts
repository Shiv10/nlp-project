import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    // this router will be used to report an incident to the authorities who will take proper action.
    res.status(200);
});
export default router;