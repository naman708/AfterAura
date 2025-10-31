import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';


// import userRoutes from './routes/user.routes';
// import afiliateRoutes from './routes/afiliate.routes';



const app = express();




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

app.use(bodyParser.json({ limit: "1mb" })); // limit payload size
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));


//  app.use("/api/v1/user/", userRoutes);
//  app.use("/api/v1/afiliate/",afiliateRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));


export default app;
