import Petani from "../models/DataPetaniModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// Fungsi untuk mendapatkan semua data petani
export const getPetanis = async (req, res) => {
  try {
    let response;
    if (req.role === "admin" || req.role === "perusahaan") {
      // Jika pengguna adalah admin atau perusahaan, ambil semua data petani
      response = await Petani.findAll({
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Informasi tambahan dari pengguna yang terkait
          },
        ],
        order: [["updatedAt", "DESC"]], // Mengurutkan data berdasarkan updatedAt secara descending
      });
    } else if (req.role === "petani") {
      // Jika pengguna adalah petani, hanya ambil data yang dia buat
      response = await Petani.findAll({
        where: {
          userId: req.userId, // Asumsi req.userId adalah ID dari pengguna yang login
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Informasi tambahan dari pengguna yang terkait
          },
        ],
        order: [["updatedAt", "DESC"]], // Mengurutkan data berdasarkan updatedAt secara descending
      });
    } else {
      // Jika role pengguna tidak dikenali atau tidak diizinkan melihat data
      return res.status(403).json({ msg: "Akses Ditolak" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error saat mendapatkan data petani:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk membuat data petani baru
export const createPetani = async (req, res) => {
  try {
    // Asumsi: Data dari req.body sudah divalidasi
    const {
      lokasilahan,
      luaslahan,
      statuskepemilikanlahan,
      periodeTanamMulai,
      periodeTanamSelesai,
      varietassingkong,
      estimasiproduksi,
      produksiaktual,
      catatantambahan,
      jenispupuk,
      jumlahpupuk,
      hargajual,
      totalpendapatan,
      pendapatanbersih,
    } = req.body;

    // Memeriksa apakah pengguna memiliki peran 'petani' atau 'admin'
    if (req.role !== "petani" && req.role !== "admin") {
      return res.status(403).json({ msg: "Hanya pengguna dengan role 'petani' atau 'admin' yang dapat membuat data petani." });
    }

    // Membuat entri baru di tabel petani
    const newPetani = await Petani.create({
      userId: req.userId, // Mengaitkan data petani dengan pengguna yang sedang login
      lokasilahan,
      luaslahan,
      statuskepemilikanlahan,
      periodeTanamMulai,
      periodeTanamSelesai,
      varietassingkong,
      estimasiproduksi,
      produksiaktual,
      catatantambahan,
      jenispupuk,
      jumlahpupuk,
      hargajual,
      totalpendapatan,
      pendapatanbersih,
    });

    res.status(201).json({ newPetani, msg: "Product Created Successfully" });
  } catch (error) {
    console.error("Error saat membuat data petani:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk memperbarui data petani
export const updatePetani = async (req, res) => {
  const { id } = req.params; // Asumsi ID data petani yang akan diupdate dikirim melalui parameter URL
  const { lokasilahan, luaslahan, statuskepemilikanlahan, periodeTanamMulai, periodeTanamSelesai, varietassingkong, estimasiproduksi, produksiaktual, catatantambahan, jenispupuk, jumlahpupuk, hargajual, totalpendapatan, pendapatanbersih } =
    req.body;

  try {
    // Memastikan hanya pengguna dengan peran 'petani' atau 'admin' yang bisa melakukan update
    if (req.role !== "petani" && req.role !== "admin") {
      return res.status(403).json({ msg: "Hanya pengguna dengan role 'petani' atau 'admin' yang dapat mengupdate data petani." });
    }

    // Tambahan validasi untuk memastikan pengguna 'petani' hanya dapat mengupdate data miliknya sendiri
    let condition = req.role === "admin" ? { id: id } : { id: id, userId: req.userId };

    const petaniToUpdate = await Petani.findOne({ where: condition });

    if (!petaniToUpdate) {
      return res.status(404).json({ msg: "Data petani tidak ditemukan atau Anda tidak memiliki hak akses untuk mengupdate data ini." });
    }

    await petaniToUpdate.update({
      lokasilahan,
      luaslahan,
      statuskepemilikanlahan,
      periodeTanamMulai,
      periodeTanamSelesai,
      varietassingkong,
      estimasiproduksi,
      produksiaktual,
      catatantambahan,
      jenispupuk,
      jumlahpupuk,
      hargajual,
      totalpendapatan,
      pendapatanbersih,
    });

    res.status(200).json({ msg: "Data petani berhasil diupdate" });
  } catch (error) {
    console.error("Error saat mengupdate data petani:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk mendapatkan data petani berdasarkan ID
export const getPetaniById = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  try {
    let response;

    // Menemukan data petani berdasarkan ID
    const petani = await Petani.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: ["name", "email"], // Informasi pengguna yang terkait
        },
      ],
    });

    // Jika petani tidak ditemukan
    if (!petani) {
      return res.status(404).json({ msg: "Data petani tidak ditemukan." });
    }

    // Jika pengguna adalah admin, atau jika pengguna adalah petani dan ID pengguna cocok dengan userId petani
    if (req.role === "admin" || (req.role === "petani" && req.userId === petani.userId)) {
      response = petani;
    } else {
      // Jika kondisi di atas tidak terpenuhi, pengguna tidak diizinkan melihat data
      return res.status(403).json({ msg: "Akses ditolak." });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error saat mendapatkan data petani:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk menghapus data petani
export const deletePetani = async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL untuk menentukan data petani yang akan dihapus

  try {
    // Memeriksa peran pengguna, mengizinkan penghapusan hanya jika pengguna adalah admin
    if (req.role !== "admin") {
      return res.status(403).json({ msg: "Hanya admin yang dapat menghapus data petani." });
    }

    // Menemukan dan menghapus data petani berdasarkan ID
    const deleted = await Petani.destroy({
      where: { id: id },
    });

    // Jika tidak ada data yang dihapus (karena tidak ditemukan), kembalikan pesan error
    if (deleted === 0) {
      return res.status(404).json({ msg: "Data petani tidak ditemukan." });
    }

    res.status(200).json({ msg: "Data petani berhasil dihapus." });
  } catch (error) {
    console.error("Error saat menghapus data petani:", error.message);
    res.status(500).json({ msg: error.message });
  }
};
