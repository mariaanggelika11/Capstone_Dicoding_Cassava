import Product from "../models/OrderPemanenModel.js";
import User from "../models/DataPabrikModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin" || req.role === "logistik" || req.role === "pabrik") {
      // Admin, logistik, dan pabrik bisa melihat semua produk dengan detail tambahan
      response = await Product.findAll({
        attributes: ["uuid", "tanggalPemanenan", "statusOrder", "varietasSingkong", "estimasiBerat", "estimasiHarga", "userId", "namaLogistik", "noHpLogistik", "platnoLogistik", "namaPerusahaan", "noHpPerusahaan"],
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Informasi tambahan dari pengguna yang membuat produk
          },
        ],
      });
    } else {
      // Pengguna lain hanya bisa melihat produk yang mereka buat dengan informasi terbatas
      response = await Product.findAll({
        attributes: ["uuid", "tanggalPemanenan", "statusOrder", "varietasSingkong", "estimasiBerat", "estimasiHarga", "namaLogistik", "noHpLogistik", "platnoLogistik", "namaPerusahaan", "noHpPerusahaan"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Informasi tambahan dari pengguna yang membuat produk
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "admin" || req.role === "pabrik" || req.role === "logistik") {
      response = await Product.findOne({
        attributes: ["uuid", "tanggalPemanenan", "statusOrder", "varietasSingkong", "estimasiBerat", "estimasiHarga", "userId", "namaLogistik", "noHpLogistik", "platnoLogistik", "namaPerusahaan", "noHpPerusahaan"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findOne({
        attributes: ["uuid", "tanggalPemanenan", "statusOrder", "varietasSingkong", "estimasiBerat", "estimasiHarga", "noHpLogistik"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    if (!response) return res.status(404).json({ msg: "Produk tidak ditemukan atau tidak dapat diakses" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { tanggalPemanenan, statusOrder, varietasSingkong, estimasiBerat, estimasiHarga, noHpLogistik } = req.body;
  try {
    await Product.create({
      tanggalPemanenan: tanggalPemanenan,
      statusOrder: statusOrder, // Use 'pending' as default if statusOrder is not provided
      varietasSingkong: varietasSingkong,
      estimasiBerat: estimasiBerat,
      estimasiHarga: estimasiHarga,
      noHpLogistik: noHpLogistik,
      userId: req.userId, // Assuming req.userId is populated through some middleware after authentication
    });
    res.status(201).json({ msg: "Order Pemanenan Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    // Data baru yang akan diperbarui
    const { namaLogistik, noHpLogistik, platnoLogistik, namaPerusahaan, noHpPerusahaan, statusOrder } = req.body;

    // Memeriksa apakah pengguna adalah admin, logistik, atau pabrik
    if (["admin", "logistik", "pabrik"].includes(req.role)) {
      // Hanya admin, logistik, dan pabrik yang dapat memperbarui
      await Product.update(
        {
          namaLogistik,
          noHpLogistik,
          platnoLogistik,
          namaPerusahaan,
          noHpPerusahaan,
          statusOrder,
        },
        {
          where: {
            id: product.id,
          },
        }
      );
      res.status(200).json({ msg: "Produk berhasil diperbarui" });
    } else {
      // Jika pengguna bukan bagian dari role yang diperbolehkan
      return res.status(403).json({ msg: "Akses terlarang" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    // Hanya admin yang dapat menghapus produk
    if (req.role !== "admin") {
      return res.status(403).json({ msg: "Akses terlarang" });
    }

    await Product.destroy({
      where: {
        id: product.id,
      },
    });

    res.status(200).json({ msg: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
