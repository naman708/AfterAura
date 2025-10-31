import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/database";


dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

/**
 * Connect to MongoDB with retry logic
 */
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Start server after DB connection
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });


  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    console.log("🕒 Retrying connection in 5 seconds...");
    setTimeout(startServer, 5000); 
  }
};

/**
 * Graceful shutdown on termination signals
 */
const gracefulShutdown = () => {
  console.log("\n🛑 Shutting down server gracefully...");
  server.close(() => {
    console.log("💤 HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

startServer();
