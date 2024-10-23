import express from "express";
import { PORT } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import userRouter from "./router/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
