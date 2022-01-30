require("dotenv").config();
import express from "express";
import { Request, Response } from "express";
import predictRouter from "./routes/predictRouter";
import reportRouter from "./routes/reportRouter";
import bodyParser from "body-parser";
import cors from "cors";
import contactRouter from './routes/contactUs';

const app: express.Application = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/predict", predictRouter);
app.use("/report", reportRouter);
app.use("/contact", contactRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("test");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
