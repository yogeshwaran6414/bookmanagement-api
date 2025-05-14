import express from "express";
import morgan from "morgan";
import bookRoutes from "./routes/bookRoutes";
import dotenv from "dotenv";
dotenv.config(); // Load .env file


const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
