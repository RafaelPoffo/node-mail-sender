import express from 'express'
import nodemailer from 'nodemailer'
import { SENDER_APP_PASSWORD, SENDER_EMAIL } from './utils/envParser.js';

const app = express();

app.use(express.json())

const mailTransporter = nodemailer.createTransport({
    service: "gmail",


    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_APP_PASSWORD
    }
})

app.get("/", (req, res) => {
    res.send({
        message: "success"
    })
})

app.post("/send", (req, res) => {
    const { mailObj } = req.body;

    sendEmail(mailObj)
    res.send({
        message: "A requisição do email foi criada com sucesso."
    })
})

function sendEmail(mailObg) {


    const mailContent = {
        from: SENDER_EMAIL,
        to: mailObg.to,
        subject: mailObg.subject,
        text: mailObg.text
    }
    mailTransporter.sendMail(mailContent, (err, data) => {
        if (err) {
            console.log("Falha ao enviar o email")
        } else {
            console.log("Email enviado com sucesso")
        }
    })
}

app.listen(8080, () => {
    console.log("App running successfully on port 8080")
})

