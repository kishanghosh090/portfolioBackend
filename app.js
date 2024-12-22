const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "https://react-portfolio-zeta-mocha.vercel.app/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files

// Replace with your email configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // or another service
  auth: {
    user: "kishanranaghosh@gmail.com",
    pass: "wbxv dpfp vonc xshy",
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "kishanranaghosh@gmail.com", // Your email to receive messages
    subject: `Contact Form Submission from ${name} and email ${email}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
