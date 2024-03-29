import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import noteRoutes from "./routes/note.js";
import groupRoutes from "./routes/group.js";


dotenv.config();

app.use(cors());

// to connect our application to mongodb
const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//middlewares
app.use(express.json());

app.use("/api/note", noteRoutes);
app.use("/api/group", groupRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log("Connected to Server");
});