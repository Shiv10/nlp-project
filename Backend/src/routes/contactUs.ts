import express from "express";
import { Request, Response } from "express";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
});

const router = express.Router();

router.post('/',async (req: Request, res: Response) => {

    const { name, email, designation, phone, content } = req.body;
    const mailOption = {
        from: process.env.EMAIL,
        to: 'shivanshsharma2012@gmail.com',
        subject: `${name}: Issue ticket`,
        text: `${content}\nContact info:\n${email}\n${phone}\n${designation}`
    };
    try{
        const info = await transporter.sendMail(mailOption);
        console.log(`${info.response}`);
        return res.status(200).json({success: true});
    } catch (e) {
        console.log(`Could not send mail: ${e}`);
        return res.status(200).json({success: false});
    };
});

export default router;