import Logistik from "../models/DataLogisticModel.js";
import User from "../models/UserModel.js";

// Fungsi untuk mendapatkan data logistik berdasarkan peran pengguna
export const getLogistik = async (req, res) => {
  try {
    let response;
    if (req.role === "admin" || req.role === "perusahaan") {
      // Jika pengguna adalah admin atau perusahaan, ambil semua data logistik
      response = await Logistik.findAll({
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Sertakan informasi pengguna yang terkait
          },
        ],
        order: [["updatedAt", "DESC"]], // Urutkan hasil berdasarkan field updatedAt secara menurun
      });
    } else if (req.role === "logistik") {
      // Jika pengguna adalah logistik, ambil hanya data yang dia buat
      response = await Logistik.findAll({
        where: {
          userId: req.userId, // Hanya ambil data yang dibuat oleh pengguna ini
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Sertakan informasi pengguna yang terkait
          },
        ],
        order: [["updatedAt", "DESC"]], // Urutkan hasil berdasarkan field updatedAt secara menurun
      });
    } else {
      // Jika peran pengguna tidak dikenali atau tidak diizinkan melihat data
      return res.status(403).json({ msg: "Akses Ditolak" });
    }
    res.status(200).json(response); // Kirim data yang diambil sebagai respons
  } catch (error) {
    console.error("Error saat mendapatkan data logistik:", error.message);
    res.status(500).json({ msg: error.message }); // Kirim respons kesalahan jika terjadi sesuatu yang salah
  }
};

// Fungsi untuk mendapatkan satu data logistik berdasarkan ID
export const getLogistikById = async (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL

  try {
    // Temukan data logistik berdasarkan ID
    const logistik = await Logistik.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: ["name", "email"], // Sertakan informasi pengguna yang terkait
        },
      ],
    });

    // Jika data logistik tidak ditemukan
    if (!logistik) {
      return res.status(404).json({ msg: "Data logistik tidak ditemukan." });
    }

    // Jika pengguna adalah admin, perusahaan, atau pengguna logistik yang membuat data tersebut
    if (req.role === "admin" || req.role === "perusahaan" || (req.role === "logistik" && req.userId === logistik.userId)) {
      return res.status(200).json(logistik); // Kirim data yang diambil sebagai respons
    } else {
      // Jika pengguna tidak diizinkan melihat data
      return res.status(403).json({ msg: "Akses ditolak." });
    }
  } catch (error) {
    console.error("Error saat mendapatkan data logistik:", error.message);
    res.status(500).json({ msg: error.message }); // Kirim respons kesalahan jika terjadi sesuatu yang salah
  }
};

// Fungsi untuk membuat data logistik baru
export const createLogistik = async (req, res) => {
  try {
    const data = req.body;
    if (req.role !== "admin" && req.role !== "logistik") {
      return res.status(403).json({ msg: "Hanya pengguna dengan peran 'admin' atau 'logistik' yang dapat membuat data logistik." });
    }

    // Buat data logistik baru dengan data dari body permintaan
    const newLogistik = await Logistik.create({
      ...data,
      userId: req.userId, // Setel userId ke ID pengguna yang membuat permintaan
    });

    res.status(201).json({ newLogistik, msg: "Data logistik berhasil dibuat." }); // Kirim data yang dibuat sebagai respons
  } catch (error) {
    console.error("Error saat membuat data logistik:", error.message);
    res.status(500).json({ msg: error.message }); // Kirim respons kesalahan jika terjadi sesuatu yang salah
  }
};

// Fungsi untuk memperbarui data logistik yang ada berdasarkan ID
export const updateLogistik = async (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const data = req.body;

  try {
    if (req.role !== "admin" || (req.role === "perusahaan" && req.role !== "logistik")) {
      return res.status(403).json({ msg: "Hanya pengguna dengan peran 'admin' atau 'logistik' yang dapat mengupdate data logistik." });
    }

    // Izinkan admin mengupdate semua data, dan pengguna logistik hanya data mereka sendiri
    const condition = req.role === "admin" || req.role === "perusahaan" ? { id: id } : { id: id, userId: req.userId };

    // Temukan data logistik yang akan diperbarui
    const logistikToUpdate = await Logistik.findOne({ where: condition });

    // Jika data tidak ditemukan
    if (!logistikToUpdate) {
      return res.status(404).json({ msg: "Data logistik tidak ditemukan atau Anda tidak memiliki hak akses untuk mengupdate data ini." });
    }

    await logistikToUpdate.update(data); // Perbarui data logistik

    res.status(200).json({ msg: "Data logistik berhasil diupdate." }); // Kirim respons sukses
  } catch (error) {
    console.error("Error saat mengupdate data logistik:", error.message);
    res.status(500).json({ msg: error.message }); // Kirim respons kesalahan jika terjadi sesuatu yang salah
  }
};

// Fungsi untuk menghapus data logistik berdasarkan ID
export const deleteLogistik = async (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL

  try {
    if (req.role !== "admin" || req.role === "perusahaan") {
      return res.status(403).json({ msg: "Hanya admin yang dapat menghapus data logistik." });
    }

    const deleted = await Logistik.destroy({
      where: { id: id }, // Hapus data logistik berdasarkan ID
    });

    if (deleted === 0) {
      return res.status(404).json({ msg: "Data logistik tidak ditemukan." });
    }

    res.status(200).json({ msg: "Data logistik berhasil dihapus." }); // Kirim respons sukses
  } catch (error) {
    console.error("Error saat menghapus data logistik:", error.message);
    res.status(500).json({ msg: error.message }); // Kirim respons kesalahan jika terjadi sesuatu yang salah
  }
};
