import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, approveOrder, startDeparture, completeDeparture, processAtFactory, completeProcessing, updatePriceAndDisplayWeight } from "../controllers/Order.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Rute untuk mendapatkan semua produk
router.get("/products", verifyUser, getProducts);

// Rute untuk mendapatkan produk berdasarkan ID
router.get("/products/:id", verifyUser, getProductById);

// Rute untuk membuat produk baru
router.post("/products", verifyUser, createProduct);

// Rute untuk memperbarui produk
router.patch("/products/:id", verifyUser, updateProduct);

// Rute untuk menghapus produk
router.delete("/products/:id", verifyUser, deleteProduct);

// Rute untuk perusahaan menyetujui order
router.patch("/orders/:id/approve", verifyUser, approveOrder);

// Rute untuk logistik memulai keberangkatan
router.patch("/orders/:id/start-departure", verifyUser, startDeparture);

// Rute untuk logistik menyelesaikan keberangkatan dengan data tambahan
router.patch("/orders/:id/complete-departure", verifyUser, completeDeparture);

// Rute untuk memproses order di pabrik
router.patch("/orders/:id/process-factory", verifyUser, processAtFactory);

// Rute untuk menyelesaikan proses order
router.patch("/orders/:id/complete", verifyUser, completeProcessing);

// Rute untuk perusahaan mendisplay harga aktual order
router.post("/update-price-and-display-weight", verifyUser, updatePriceAndDisplayWeight);

// Rote History order jika pesanan selesai
router.put("/complete-processing/:id", verifyUser, completeProcessing);

export default router;
