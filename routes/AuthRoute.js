import express from "express";
import { Register, Login, Me, logOut } from "../controllers/Auth.js";

const router = express.Router();

router.post("/register", Register); // Perbaiki kesalahan penulisan
router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", logOut);

export default router;
