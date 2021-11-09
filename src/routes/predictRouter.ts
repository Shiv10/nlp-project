import express from 'express';
import { Request, Response } from 'express';
import { PythonShell } from 'python-shell';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    // this router will be used for prediction using machine learning model
    const arr: any = req.body.text.split(" ");
    const options: any = {
        mode: 'text',
        pythonPath: 'python',
        pythonOptions: ['-u'],
        scriptPath: 'src/routes/modelUtility',
        args : arr
    };

    PythonShell.run('runModel.py', options, (err: any, results: any) => {
        if (err) 
          throw err;
        // Results is an array consisting of messages collected during execution
        console.log(results[0]);
        res.status(200);
        res.send(results[0]);
    });
    
    
});

export default router;