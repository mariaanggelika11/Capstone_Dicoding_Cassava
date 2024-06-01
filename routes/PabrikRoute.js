import express from "express";
import { getPabrik, createPabrik, updatePabrik, deletePabrik, getPabrikById } from "../controllers/Pabrik.js"; // Pastikan path sesuai
import { verifyUser } from "../middleware/AuthUser.js"; // Pastikan path sesuai

const router = express.Router();

// Route untuk mendapatkan semua data pabrik
router.get("/pabrik", verifyUser, getPabrik);
// Route untuk mendapatkan semua data pabrik
router.get("/pabrik/:id", verifyUser, getPabrikById);

// Route untuk membuat data pabrik baru
router.post("/pabrik", verifyUser, createPabrik);

// Route untuk memperbarui data pabrik
router.put("/pabrik/:id", verifyUser, updatePabrik);

// Route untuk menghapus data pabrik
router.delete("/pabrik/:id", verifyUser, deletePabrik);

export default router;
