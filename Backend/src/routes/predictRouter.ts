import express from "express";
import { Request, Response } from "express";
import { PythonShell } from "python-shell";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
	// this router will be used for prediction using machine learning model
	const arr: any = req.body.text.split(" ");
	const options: any = {
		mode: "text",
		pythonPath: "python",
		pythonOptions: ["-u"],
		scriptPath: "src/routes/modelUtility",
		args: arr,
	};

	PythonShell.run("runModel.py", options, (err: any, results: any) => {
		if (err) {
			res.status(500);
			return res.send("Internal server error");
		}
		if (results[0] === "0") {
			return res.send("Abusive Comment");
		}

		res.status(200);
		if (results[0] === "1") {
			return res.send("Hateful Comment");
		}

		if (results[0] === "2") {
			return res.send("Normal Comment");
		}
		if (results[0] === "3") {
			return res.send("Spam Comment");
		}
	});
});

export default router;
