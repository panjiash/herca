import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import komisiRoute from "./routes/komisiRoute.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
  })
);
app.use(bodyParser.json());
app.use(komisiRoute);
app.listen(5000, () => {
  console.log("Server running on port 5000..");
});
