import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';

const app = express();

//imnporting routes
import userRouter from './routes/user.router';
import eventRouter from './routes/event.router';
import ticketRouter from './routes/ticket.router';

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 0,
  message: "Too many requests from this IP, please try again later.",
});
// app.use(limiter);

app.use(bodyParser.json({ limit: "1mb" })); 
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/event',eventRouter);
app.use('/api/v1/ticket',ticketRouter);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));


export default app;
