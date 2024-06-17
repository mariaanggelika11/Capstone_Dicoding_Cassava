import Perusahaan from "../models/DataPerusahaanModel.js";
import User from "../models/UserModel.js";

// Fungsi untuk mendapatkan semua data perusahaan
export const getPerusahaan = async (req, res) => {
  try {
    let response;
    if (["admin", "logistik", "perusahaan", "pabrik", "petani"].includes(req.role)) {
      response = await Perusahaan.findAll({
        attributes: ["idharga", "tanggalupdateharga", "hargaGradeA", "hargaGradeB", "hargaGradeC", "catatan"],
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    } else {
      response = await Perusahaan.findAll({
        where: { userId: req.userId },
        attributes: ["idharga", "tanggalupdateharga", "hargaGradeA", "hargaGradeB", "hargaGradeC", "catatan"],
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk mendapatkan data perusahaan berdasarkan ID
export const getPerusahaanById = async (req, res) => {
  try {
    const perusahaan = await Perusahaan.findOne({ where: { id: req.params.id } });
    if (!perusahaan) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (["admin", "logistik", "perusahaan", "pabrik", "petani"].includes(req.role)) {
      response = await Perusahaan.findOne({
        attributes: ["idharga", "tanggalupdateharga", "hargaGradeA", "hargaGradeB", "hargaGradeC", "catatan"],
        where: { id: perusahaan.id },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    } else {
      response = await Perusahaan.findOne({
        attributes: ["idharga", "tanggalupdateharga", "hargaGradeA", "hargaGradeB", "hargaGradeC", "catatan"],
        where: { id: perusahaan.id, userId: req.userId },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    }
    if (!response) return res.status(404).json({ msg: "Data tidak ditemukan atau tidak dapat diakses" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk membuat data perusahaan baru
export const createPerusahaan = async (req, res) => {
  const { idharga, tanggalupdateharga, hargaGradeA, hargaGradeB, hargaGradeC, catatan } = req.body;
  try {
    await Perusahaan.create({
      idharga: idharga,
      tanggalupdateharga: tanggalupdateharga,
      hargaGradeA: hargaGradeA,
      hargaGradeB: hargaGradeB,
      hargaGradeC: hargaGradeC,
      catatan: catatan,
      userId: req.userId, // Mengaitkan data perusahaan dengan pengguna yang login
    });
    res.status(201).json({ msg: "Data Perusahaan Created Successfully" }); // Kirim respons sukses
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan
  }
};

// Fungsi untuk memperbarui data perusahaan
export const updatePerusahaan = async (req, res) => {
  try {
    const perusahaan = await Perusahaan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!perusahaan) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { idharga, tanggalupdateharga, hargaGradeA, hargaGradeB, hargaGradeC, catatan } = req.body;

    if (["admin", "perusahaan"].includes(req.role)) {
      await perusahaan.update(
        {
          idharga,
          tanggalupdateharga,
          hargaGradeA,
          hargaGradeB,
          hargaGradeC,
          catatan,
        },
        {
          where: {
            id: perusahaan.id,
          },
        }
      );
      res.status(200).json({ msg: "Data Perusahaan berhasil diperbarui" });
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk menghapus data perusahaan
export const deletePerusahaan = async (req, res) => {
  try {
    const perusahaan = await Perusahaan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!perusahaan) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role !== "admin" && req.role !== "perusahaan") {
      return res.status(403).json({ msg: "Akses terlarang" });
    }

    await Perusahaan.destroy({
      where: {
        id: perusahaan.id,
      },
    });

    res.status(200).json({ msg: "Data Perusahaan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
