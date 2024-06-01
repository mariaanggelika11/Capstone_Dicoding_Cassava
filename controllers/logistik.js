import Logistik from "../models/DataLogisticModel.js";
import User from "../models/DataPabrikModel.js";

export const getLogistik = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      // Jika pengguna adalah admin, ambil semua data logistik
      response = await Logistik.findAll({
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
    } else if (req.role === "logistik") {
      // Jika pengguna adalah logistik, hanya ambil data yang dia buat
      response = await Logistik.findAll({
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
    console.error("Error saat mendapatkan data logistik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const getLogistikById = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  try {
    let response;

    // Menemukan data logistik berdasarkan ID
    const logistik = await Logistik.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: ["name", "email"], // Informasi pengguna yang terkait
        },
      ],
    });

    // Jika logistik tidak ditemukan
    if (!logistik) {
      return res.status(404).json({ msg: "Data logistik tidak ditemukan." });
    }

    // Jika pengguna adalah admin, atau jika pengguna adalah logistik dan ID pengguna cocok dengan userId logistik
    if (req.role === "admin" || (req.role === "logistik" && req.userId === logistik.userId)) {
      response = logistik;
    } else {
      // Jika kondisi di atas tidak terpenuhi, pengguna tidak diizinkan melihat data
      return res.status(403).json({ msg: "Akses ditolak." });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error saat mendapatkan data logistik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const createLogistik = async (req, res) => {
  try {
    const data = req.body;
    if (req.role !== "admin" && req.role !== "logistik") {
      return res.status(403).json({ msg: "Hanya pengguna dengan role 'admin' atau 'logistik' yang dapat membuat data logistik." });
    }

    const newLogistik = await Logistik.create({
      ...data,
      userId: req.userId,
    });

    res.status(201).json({ newLogistik, msg: "Data logistik berhasil dibuat." });
  } catch (error) {
    console.error("Error saat membuat data logistik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const updateLogistik = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    if (req.role !== "admin" && req.role !== "logistik") {
      return res.status(403).json({ msg: "Hanya pengguna dengan role 'admin' atau 'logistik' yang dapat mengupdate data logistik." });
    }

    // Menyesuaikan kondisi untuk memperbolehkan admin mengupdate semua data dan pengguna logistik hanya data miliknya
    let condition = req.role === "admin" ? { id: id } : { id: id, userId: req.userId };

    const logistikToUpdate = await Logistik.findOne({ where: condition });

    if (!logistikToUpdate) {
      return res.status(404).json({ msg: "Data logistik tidak ditemukan atau Anda tidak memiliki hak akses untuk mengupdate data ini." });
    }

    await logistikToUpdate.update(data);

    res.status(200).json({ msg: "Data logistik berhasil diupdate." });
  } catch (error) {
    console.error("Error saat mengupdate data logistik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const deleteLogistik = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.role !== "admin") {
      return res.status(403).json({ msg: "Hanya admin yang dapat menghapus data logistik." });
    }

    const deleted = await Logistik.destroy({
      where: { id: id },
    });

    if (deleted === 0) {
      return res.status(404).json({ msg: "Data logistik tidak ditemukan." });
    }

    res.status(200).json({ msg: "Data logistik berhasil dihapus." });
  } catch (error) {
    console.error("Error saat menghapus data logistik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};
