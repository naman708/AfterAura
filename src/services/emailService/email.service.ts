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
  resetLink: string;
}

export interface RegistrationData {
  name: string;
}

export interface TicketBookingData {
  name: string;
  event: string;
  date: string;
  seat: string;
  bookingId: string;
}

// -------------------------
// Email Service Class
// -------------------------

class EmailService {

  async sendLoginOtp(to: string, data: LoginOtpData): Promise<void> {
    const html = renderTemplate("loginOtp", data);

    await transporter.sendMail({
      from: "no-reply@yourapp.com",
      to,
      subject: "Your Login OTP",
      html,
    });
  }

  async sendForgotPassword(to: string, data: ForgotPasswordData): Promise<void> {
    const html = renderTemplate("forgotPassword", data);

    await transporter.sendMail({
      from: "no-reply@yourapp.com",
      to,
      subject: "Reset Your Password",
      html,
    });
  }

  async sendRegistrationEmail(to: string, data: RegistrationData): Promise<void> {
    const html = renderTemplate("registerUser", data);

    await transporter.sendMail({
      from: "welcome@yourapp.com",
      to,
      subject: "Welcome to Our Platform",
      html,
    });
  }

  async sendTicketBooking(to: string, data: TicketBookingData): Promise<void> {
    const html = renderTemplate("ticketBook", data);

    await transporter.sendMail({
      from: "tickets@yourapp.com",
      to,
      subject: "Ticket Booking Confirmation",
      html,
    });
  }
}

export const emailService = new EmailService();
