import express from "express";
import { getPetanis, createPetani, updatePetani, getPetaniById, deletePetani } from "../controllers/Petani.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Route untuk mendapatkan semua petani
router.get("/petanis", verifyUser, getPetanis);
// Route untuk mendapatkan data spesifik petani
router.get("/petani/:id", verifyUser, getPetaniById);

// Route untuk membuat data petani baru
router.post("/petani", verifyUser, createPetani);
// Route untuk memperbarui data petani
router.put("/petani/:id", verifyUser, updatePetani);

// Route untuk menghapus data petani
router.delete("/petani/:id", verifyUser, deletePetani);

export default router;
