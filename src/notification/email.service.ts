import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Load HTML email template and replace variables
 */
const getTemplate = (templateName: string, variables: Record<string, string>) => {
  const templatePath = path.join(__dirname, "templates", `${templateName}.html`);
  let template = fs.readFileSync(templatePath, "utf-8");

  for (const key in variables) {
    const regex = new RegExp(`{{${key}}}`, "g");
    template = template.replace(regex, variables[key]);
  }

  return template;
};

/**
 * Send email using template
 */
export const sendEmailTemplate = async (
  to: string,
  subject: string,
  templateName: string,
  variables: Record<string, string>
) => {
  try {
    const htmlContent = getTemplate(templateName, variables);

    const info = await transporter.sendMail({
      from: `"Event Platform" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
