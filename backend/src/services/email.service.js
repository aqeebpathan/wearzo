import { Resend } from "resend";
import "../config/dotenv.config.js";
import { verificationEmailTemplate } from "../templates/verificationTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (toEmail, name, code) => {
  try {
    const response = await resend.emails.send({
      from: "WEARZO <onboarding@resend.dev>",
      to: toEmail,
      subject: "Verify your email address",
      html: verificationEmailTemplate(name, code),
    });

    return response;
  } catch (error) {
    throw error;
  }
};
