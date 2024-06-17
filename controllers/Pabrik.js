import Pabrik from "../models/DataPabrikModel.js"; // Import model Pabrik dari path yang sesuai
import User from "../models/UserModel.js"; // Import model User dari path yang sesuai

// Fungsi untuk mendapatkan semua data pabrik
export const getPabrik = async (req, res) => {
  try {
    let response;
    if (req.role === "admin" || req.role === "perusahaan") {
      // Jika pengguna adalah admin atau perusahaan, ambil semua data pabrik
      response = await Pabrik.findAll({
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Sertakan informasi pengguna terkait
          },
        ],
        order: [["updatedAt", "DESC"]], // Urutkan berdasarkan waktu terakhir diperbarui secara menurun
      });
    } else if (req.role === "pabrik") {
      // Jika pengguna adalah pabrik, hanya ambil data yang dibuat oleh pabrik tersebut
      response = await Pabrik.findAll({
        where: {
          userId: req.userId, // Ambil data berdasarkan userId dari pengguna yang login
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Sertakan informasi pengguna terkait
          },
        ],
        order: [["updatedAt", "DESC"]], // Urutkan berdasarkan waktu terakhir diperbarui secara menurun
      });
    } else {
      // Jika role pengguna tidak dikenali atau tidak diizinkan melihat data
      return res.status(403).json({ msg: "Akses Ditolak" });
    }
    res.status(200).json(response); // Berikan respons dengan data yang ditemukan
  } catch (error) {
    console.error("Error saat mendapatkan data pabrik:", error.message); // Log error ke console
    res.status(500).json({ msg: error.message }); // Berikan respons error dengan pesan
  }
};

// Fungsi untuk mendapatkan data pabrik berdasarkan ID
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
          attributes: ["name", "email"], // Sertakan informasi pengguna terkait
        },
      ],
    });

    // Jika pabrik tidak ditemukan
    if (!pabrik) {
      return res.status(404).json({ msg: "Data pabrik tidak ditemukan." });
    }

    // Jika pengguna adalah admin, atau jika pengguna adalah pabrik dan ID pengguna cocok dengan userId pabrik
    if (req.role === "admin" || (req.role === "pabrik" && req.userId === pabrik.userId)) {
      response = pabrik; // Berikan respons dengan data pabrik
    } else {
      // Jika kondisi di atas tidak terpenuhi, pengguna tidak diizinkan melihat data
      return res.status(403).json({ msg: "Akses ditolak." });
    }

    res.status(200).json(response); // Berikan respons dengan data yang ditemukan
  } catch (error) {
    console.error("Error saat mendapatkan data pabrik:", error.message); // Log error ke console
    res.status(500).json({ msg: error.message }); // Berikan respons error dengan pesan
  }
};

// Fungsi untuk membuat data pabrik baru
export const createPabrik = async (req, res) => {
  try {
    const data = req.body; // Mengambil data dari request body
    if (req.role !== "admin" && req.role !== "pabrik") {
      return res.status(403).json({ msg: "Hanya pengguna dengan role 'admin' atau 'pabrik' yang dapat membuat data pabrik." });
    }

    const newPabrik = await Pabrik.create({
      ...data,
      userId: req.userId, // Mengaitkan data pabrik dengan userId dari pengguna yang login
    });

    res.status(201).json({ newPabrik, msg: "Data pabrik berhasil dibuat." }); // Berikan respons dengan data pabrik baru yang dibuat
  } catch (error) {
    console.error("Error saat membuat data pabrik:", error.message); // Log error ke console
    res.status(500).json({ msg: error.message }); // Berikan respons error dengan pesan
  }
};

// Fungsi untuk memperbarui data pabrik
export const updatePabrik = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL
  const data = req.body; // Mengambil data dari request body

  try {
    if (req.role !== "admin" && req.role !== "pabrik") {
      return res.status(403).json({ msg: "Hanya pengguna dengan role 'admin' atau 'pabrik' yang dapat mengupdate data pabrik." });
    }

    let condition = req.role === "admin" ? { id: id } : { id: id, userId: req.userId }; // Tentukan kondisi berdasarkan peran pengguna

    const pabrikToUpdate = await Pabrik.findOne({ where: condition }); // Cari data pabrik yang akan diperbarui

    if (!pabrikToUpdate) {
      return res.status(404).json({ msg: "Data pabrik tidak ditemukan atau Anda tidak memiliki hak akses untuk mengupdate data ini." });
    }

    await pabrikToUpdate.update(data); // Perbarui data pabrik

    res.status(200).json({ msg: "Data pabrik berhasil diupdate." }); // Berikan respons sukses
  } catch (error) {
    console.error("Error saat mengupdate data pabrik:", error.message); // Log error ke console
    res.status(500).json({ msg: error.message }); // Berikan respons error dengan pesan
  }
};

// Fungsi untuk menghapus data pabrik
export const deletePabrik = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  try {
    if (req.role !== "admin") {
      return res.status(403).json({ msg: "Hanya admin yang dapat menghapus data pabrik." });
    }

    const deleted = await Pabrik.destroy({
      where: { id: id }, // Hapus data pabrik berdasarkan ID
    });

    if (deleted === 0) {
      return res.status(404).json({ msg: "Data pabrik tidak ditemukan." });
    }

    res.status(200).json({ msg: "Data pabrik berhasil dihapus." }); // Berikan respons sukses
  } catch (error) {
    console.error("Error saat menghapus data pabrik:", error.message); // Log error ke console
    res.status(500).json({ msg: error.message }); // Berikan respons error dengan pesan
  }
};
