import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/uploads"; // Ensure this directory exists
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable Error:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    console.log("Received form fields:", fields);
    console.log("Received file:", files.file);

    const { name, email, description } = fields;
    const file = files.file;

    if (!name || !email || !description || !file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      console.log("Initializing email transport...");

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        logger: true,
        debug: true,
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "nlathiya40@gmail.com",
        subject: "New Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nDescription: ${description}`,
        attachments: [
          {
            filename: file.originalFilename || "attachment",
            path: file.filepath,
          },
        ],
      };

      console.log("Sending email...");
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.response);

      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  });
}
