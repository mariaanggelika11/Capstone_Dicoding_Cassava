import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import multer from "multer";

const router = express.Router();

// Konfigurasi multer seperti yang sudah Anda definisikan
const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads/img/profile/",
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
});

// end logika tambah gambar
// router.get('/users', getUsers);
// router.get('/users/:uuid', getUserById);
// router.post('/users', createUser);
// router.put('/users/:uuid', updateUser);
// router.delete('/users/:id', deleteUser);
// router.patch('/users/:uuid', verifyUser, adminOnly, updateUser);
// ****************************************************************
router.get("/users", verifyUser, adminOnly, getUsers);
// router.get('/users/:uuid', verifyUser, adminOnly, getUserById); get detail user
router.get("/users/:uuid", verifyUser, getUserById);
router.post("/users", verifyUser, adminOnly, createUser);
router.patch("/users/:uuid", verifyUser, upload.single("foto"), updateUser);
router.delete("/users/:uuid", verifyUser, adminOnly, deleteUser);
export default router;
