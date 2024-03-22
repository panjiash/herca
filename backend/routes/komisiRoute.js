import express from "express";
import { bayarKomisi, getKomisi } from "../controllers/komisi.js";

const komisiRoute = express.Router();
komisiRoute.get("/komisi", getKomisi);
komisiRoute.post("/komisi", bayarKomisi);
export default komisiRoute;
