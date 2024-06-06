import Pabrik from "../models/DataPabrikModel.js"; // Pastikan path sesuai
import User from "../models/UserModel.js";

export const getPabrik = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      // Jika pengguna adalah admin, ambil semua data pabrik
      response = await Pabrik.findAll({
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
    } else if (req.role === "pabrik") {
      // Jika pengguna adalah pabrik, hanya ambil data yang dia buat
      response = await Pabrik.findAll({
        where: {
          userId: req.userId, // Asumsi req.userId adalah ID dari pengguna yang login
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
    } else {
      // Jika role pengguna tidak dikenali atau tidak diizinkan melihat data
      return res.status(403).json({ msg: "Akses Ditolak" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error saat mendapatkan data pabrik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const getPabrikById = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  try {
    let response;

    // Menemukan data pabrik berdasarkan ID
    const pabrik = await Pabrik.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: ["name", "email"], // Informasi pengguna yang terkait
        },
      ],
    });

    // Jika pabrik tidak ditemukan
    if (!pabrik) {
      return res.status(404).json({ msg: "Data pabrik tidak ditemukan." });
    }

    // Jika pengguna adalah admin, atau jika pengguna adalah pabrik dan ID pengguna cocok dengan userId pabrik
    if (req.role === "admin" || (req.role === "pabrik" && req.userId === pabrik.userId)) {
      response = pabrik;
    } else {
      // Jika kondisi di atas tidak terpenuhi, pengguna tidak diizinkan melihat data
      return res.status(403).json({ msg: "Akses ditolak." });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error saat mendapatkan data pabrik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const createPabrik = async (req, res) => {
  try {
    const data = req.body;
    if (req.role !== "admin" && req.role !== "pabrik") {
      return res.status(403).json({ msg: "Hanya pengguna dengan role 'admin' atau 'pabrik' yang dapat membuat data pabrik." });
    }

    const newPabrik = await Pabrik.create({
      ...data,
      userId: req.userId,
    });

    res.status(201).json({ newPabrik, msg: "Data pabrik berhasil dibuat." });
  } catch (error) {
    console.error("Error saat membuat data pabrik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const updatePabrik = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    if (req.role !== "admin" && req.role !== "pabrik") {
      return res.status(403).json({ msg: "Hanya pengguna dengan role 'admin' atau 'pabrik' yang dapat mengupdate data pabrik." });
    }

    let condition = req.role === "admin" ? { id: id } : { id: id, userId: req.userId };

    const pabrikToUpdate = await Pabrik.findOne({ where: condition });

    if (!pabrikToUpdate) {
      return res.status(404).json({ msg: "Data pabrik tidak ditemukan atau Anda tidak memiliki hak akses untuk mengupdate data ini." });
    }

    await pabrikToUpdate.update(data);

    res.status(200).json({ msg: "Data pabrik berhasil diupdate." });
  } catch (error) {
    console.error("Error saat mengupdate data pabrik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const deletePabrik = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.role !== "admin") {
      return res.status(403).json({ msg: "Hanya admin yang dapat menghapus data pabrik." });
    }

    const deleted = await Pabrik.destroy({
      where: { id: id },
    });

    if (deleted === 0) {
      return res.status(404).json({ msg: "Data pabrik tidak ditemukan." });
    }

    res.status(200).json({ msg: "Data pabrik berhasil dihapus." });
  } catch (error) {
    console.error("Error saat menghapus data pabrik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};
