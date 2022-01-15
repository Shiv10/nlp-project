import express from "express";
import { Request, Response } from "express";
import { PythonShell } from "python-shell";
import { exec } from "child_process";

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

	exec(`python3 -u src/routes/modelUtility/runModel.py ${req.body.text}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return res.send("Internal server error");;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return res.send("Internal server error");;
		}
		res.status(200);
		stdout = stdout.trim()

		if (stdout === "0") {
			return res.send("Abusive Comment");
		}
		if (stdout === "1") {
			return res.send("Hateful Comment");
		}
		if (stdout === "2") {
			return res.send("Normal Comment");
		}
		if (stdout === "3") {
			return res.send("Spam Comment");
		}
	});

	// PythonShell.run("runModel.py", options, (err: any, results: any) => {
	// 	if (err) {
	// 		res.status(500);
	// 		return res.send("Internal server error");
	// 	}
	// 	res.status(200);
	// 	if (results[0] === "0") {
	// 		return res.send("Abusive Comment");
	// 	}
	// 	if (results[0] === "1") {
	// 		return res.send("Hateful Comment");
	// 	}

	// 	if (results[0] === "2") {
	// 		return res.send("Normal Comment");
	// 	}
	// 	if (results[0] === "3") {
	// 		return res.send("Spam Comment");
	// 	}
	// });
});

export default router;
