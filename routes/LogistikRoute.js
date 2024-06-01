import express from "express";
import { getLogistik, createLogistik, updateLogistik, deleteLogistik, getLogistikById } from "../controllers/logistik.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Route untuk mendapatkan semua data logistik
router.get("/logistik", verifyUser, getLogistik);
// Route untuk mendapatkan semua data logistik
router.get("/logistik/:id", verifyUser, getLogistikById);
// Route untuk membuat data logistik baru
router.post("/logistik", verifyUser, createLogistik);
// Route untuk memperbarui data logistik
router.put("/logistik/:id", verifyUser, updateLogistik);
// Route untuk menghapus data logistik
router.delete("/logistik/:id", verifyUser, deleteLogistik);

export default router;
