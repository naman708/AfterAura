import { transporter } from "./config/mailer";
import { renderTemplate } from "./utils/templateRenderer";

// -------------------------
// Define Interfaces
// -------------------------

export interface LoginOtpData {
  name: string;
  otp: string;
}

export interface ForgotPasswordData {
  name: string;
  otp: string;
}

export interface RegistrationData {
  name: string;
  loginLink:string;
}

export interface TicketBookingData {
  name: string;
  event: string;
  date: string;
  bookingId: string;
}

// -------------------------
// Email Service Class
// -------------------------

class EmailService {

  async sendLoginOtp(to: string, data: LoginOtpData): Promise<void> {
    const html = renderTemplate("loginOtp", data);

    await transporter.sendMail({
      from: "afteraura11@gmail.com",
      to,
      subject: "Your Login OTP",
      html,
    });
  }

  async sendForgotPassword(to: string, data: ForgotPasswordData): Promise<void> {
    const html = renderTemplate("forgotPassword", data);

    await transporter.sendMail({
      from: "afteraura11@gmail.com",
      to,
      subject: "Reset Your Password",
      html,
    });
  }

  async sendRegistrationEmail(to: string, data: RegistrationData): Promise<void> {
    console.log("===== EmailService ==== sendRegistrationEmail ===== to:", to)
    const html = renderTemplate("registerUser", data);

    const response =await transporter.sendMail({
      from: "afteraura11@gmail.com",
      to,
      subject: "Welcome to Our Platform",
      html,
       attachments: [
    {
      filename: "bg.png",
      path: "/home/naman-pawar/AfterAura/src/services/emailService/attachments/bg.png", 
      cid: "hauntedbg"
    }
  ]
    });
    console.log("========= EmailService ===== sendRegistrationEmail ===== response:", response)
  }

  async sendTicketBooking(to: string, data: TicketBookingData): Promise<void> {
    const html = renderTemplate("ticketBook", data);

    await transporter.sendMail({
      from: "afteraura11@gmail.com",
      to,
      subject: "Ticket Booking Confirmation",
      html,
       attachments: [
    {
      filename: "bg.png",
      path: "/home/naman-pawar/AfterAura/src/services/emailService/attachments/bg.png", 
      cid: "partybg"
    }
  ]
    });
  }
}

export const emailService = new EmailService();
