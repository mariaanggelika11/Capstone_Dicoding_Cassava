import express from "express";
import { searchById } from "../controllers/Search.js";

const router = express.Router();

router.get("/search/:uuid", searchById);

export default router;
