import express from "express";
import { getPerusahaan, createPerusahaan, updatePerusahaan, deletePerusahaan, getPerusahaanById } from "../controllers/Perusahaan.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Route untuk mendapatkan semua data Perusahaan
router.get("/perusahaan", verifyUser, getPerusahaan);
// Route untuk mendapatkan data Perusahaan berdasarkan Id
router.get("/perusahaan/:id", verifyUser, getPerusahaanById);
// Route untuk membuat data perusahaaan baru
router.post("/perusahaan", verifyUser, createPerusahaan);
// Route untuk memperbarui data perusahaan
router.put("/perusahaan/:id", verifyUser, updatePerusahaan);
// Route untuk menghapus data perusahaan
router.delete("/perusahaan/:id", verifyUser, deletePerusahaan);

export default router;
