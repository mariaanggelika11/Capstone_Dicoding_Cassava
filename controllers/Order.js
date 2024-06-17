// controllers/productController.js

import Product from "../models/OrderPemanenModel.js";
import User from "../models/UserModel.js"; // Import model User
import OrderHistory from "../models/OrderHistory.js"; // Import model OrderHistory
import { Op } from "sequelize"; // Import operator Sequelize

// Controller untuk mendapatkan semua produk
export const getProducts = async (req, res) => {
  try {
    let response;
    // Jika role pengguna termasuk admin, perusahaan, logistik, atau pabrik
    if (["admin", "perusahaan", "logistik", "pabrik"].includes(req.role)) {
      response = await Product.findAll({
        attributes: ["uuid", "tanggalPemanenan", "statusOrder", "varietasSingkong", "estimasiBerat", "estimasiHarga", "userId", "namaLogistik", "noHpLogistik", "platnoLogistik", "namaPerusahaan", "noHpPerusahaan"],
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Sertakan informasi tambahan dari pengguna yang membuat produk
          },
        ],
      });
    } else {
      // Jika role pengguna bukan admin, perusahaan, logistik, atau pabrik
      response = await Product.findAll({
        attributes: ["uuid", "tanggalPemanenan", "statusOrder", "varietasSingkong", "estimasiBerat", "estimasiHarga", "namaLogistik", "noHpLogistik", "platnoLogistik", "namaPerusahaan", "noHpPerusahaan"],
        where: {
          userId: req.userId, // Ambil data berdasarkan userId pengguna yang sedang login
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Sertakan informasi tambahan dari pengguna yang membuat produk
          },
        ],
      });
    }
    res.status(200).json(response); // Kirim respons dengan produk yang didapat
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan server
  }
};

// Controller untuk mendapatkan produk berdasarkan ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" }); // Kirim respons jika produk tidak ditemukan

    let response;
    // Jika role pengguna termasuk admin, perusahaan, pabrik, atau logistik
    if (["admin", "perusahaan", "pabrik", "logistik"].includes(req.role)) {
      response = await Product.findOne({
        attributes: ["uuid", "tanggalPemanenan", "statusOrder", "varietasSingkong", "estimasiBerat", "estimasiHarga", "userId", "namaLogistik", "noHpLogistik", "platnoLogistik", "namaPerusahaan", "noHpPerusahaan"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Sertakan informasi tambahan dari pengguna yang membuat produk
          },
        ],
      });
    } else {
      // Jika role pengguna bukan admin, perusahaan, pabrik, atau logistik
      response = await Product.findOne({
        attributes: ["uuid", "tanggalPemanenan", "statusOrder", "varietasSingkong", "estimasiBerat", "estimasiHarga", "noHpLogistik"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }], // Pastikan data milik pengguna yang sedang login
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"], // Sertakan informasi tambahan dari pengguna yang membuat produk
          },
        ],
      });
    }
    if (!response) return res.status(404).json({ msg: "Produk tidak ditemukan atau tidak dapat diakses" }); // Kirim respons jika produk tidak ditemukan atau tidak dapat diakses
    res.status(200).json(response); // Kirim respons dengan produk yang didapat
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan server
  }
};

// Controller untuk membuat produk baru
export const createProduct = async (req, res) => {
  const { tanggalPemanenan, statusOrder, varietasSingkong, estimasiBerat, estimasiHarga, noHpLogistik } = req.body;
  try {
    await Product.create({
      tanggalPemanenan,
      statusOrder: statusOrder || "pending", // Set status default ke 'pending' jika tidak ada status yang disediakan
      varietasSingkong,
      estimasiBerat,
      estimasiHarga,
      noHpLogistik,
      userId: req.userId, // Asumsikan req.userId sudah diisi melalui middleware autentikasi
    });
    res.status(201).json({ msg: "Order Pemanenan Created Successfully" }); // Kirim respons berhasil
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan server
  }
};

// Controller untuk memperbarui produk
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" }); // Kirim respons jika produk tidak ditemukan

    // Data baru yang akan diperbarui
    const { namaLogistik, noHpLogistik, platnoLogistik, namaPerusahaan, noHpPerusahaan, statusOrder, beratSingkong, beratBatang, beratDaun } = req.body;

    // Memeriksa apakah pengguna adalah admin, logistik, pabrik, atau perusahaan
    if (["admin", "logistik", "pabrik", "perusahaan"].includes(req.role)) {
      // Hanya admin, logistik, pabrik, dan perusahaan yang dapat memperbarui data
      await Product.update(
        {
          namaLogistik,
          noHpLogistik,
          platnoLogistik,
          namaPerusahaan,
          noHpPerusahaan,
          statusOrder,
          beratSingkong,
          beratBatang,
          beratDaun,
        },
        {
          where: {
            id: product.id,
          },
        }
      );

      // Jika status pesanan adalah 'selesai', tambahkan ke riwayat pesanan
      if (statusOrder === "selesai") {
        await OrderHistory.create({
          orderId: product.id,
          userId: req.userId,
          statusOrder: statusOrder,
          namaLogistik: namaLogistik,
          namaPabrik: namaPerusahaan,
        });
      }

      res.status(200).json({ msg: "Produk berhasil diperbarui" }); // Kirim respons berhasil
    } else {
      // Jika pengguna bukan bagian dari role yang diperbolehkan
      return res.status(403).json({ msg: "Akses terlarang" }); // Kirim respons akses terlarang
    }
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan server
  }
};

// Controller untuk menghapus produk
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" }); // Kirim respons jika produk tidak ditemukan

    // Hanya admin yang dapat menghapus produk
    if (req.role !== "admin") {
      return res.status(403).json({ msg: "Akses terlarang" }); // Kirim respons akses terlarang
    }

    await Product.destroy({
      where: {
        id: product.id,
      },
    });

    res.status(200).json({ msg: "Produk berhasil dihapus" }); // Kirim respons berhasil
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan server
  }
};

// Controller untuk menyetujui order oleh perusahaan
export const approveOrder = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" }); // Kirim respons jika produk tidak ditemukan

    if (req.role === "perusahaan") {
      await Product.update({ statusOrder: "menunggu dipanen" }, { where: { id: product.id } });
      res.status(200).json({ msg: "Order disetujui, menunggu dipanen" }); // Kirim respons berhasil
    } else {
      res.status(403).json({ msg: "Akses terlarang" }); // Kirim respons akses terlarang
    }
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan server
  }
};

// Controller untuk memulai keberangkatan oleh logistik
export const startDeparture = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" }); // Kirim respons jika produk tidak ditemukan

    if (req.role === "logistik") {
      await Product.update({ statusOrder: "menuju pabrik" }, { where: { id: product.id } });
      res.status(200).json({ msg: "Keberangkatan dimulai, menuju pabrik" }); // Kirim respons berhasil
    } else {
      res.status(403).json({ msg: "Akses terlarang" }); // Kirim respons akses terlarang
    }
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan server
  }
};

// Controller untuk menyelesaikan keberangkatan oleh logistik
export const completeDeparture = async (req, res) => {
  const { beratSingkong, beratBatang, beratDaun } = req.body;
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" }); // Kirim respons jika produk tidak ditemukan

    if (req.role === "logistik") {
      await Product.update(
        {
          statusOrder: "menunggu diproses",
          beratSingkong,
          beratBatang,
          beratDaun,
        },
        { where: { id: product.id } }
      );

      // Meminta perusahaan untuk mengisi harga aktual
      res.status(200).json({ msg: "Keberangkatan selesai, data berat diperbarui. Mohon perusahaan untuk mengisi harga aktual dan menampilkan berat." }); // Kirim respons berhasil
    } else {
      res.status(403).json({ msg: "Akses terlarang" }); // Kirim respons akses terlarang
    }
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan server
  }
};

// Controller untuk memproses order di pabrik
export const processAtFactory = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" }); // Kirim respons jika produk tidak ditemukan

    if (req.role === "pabrik") {
      await Product.update({ statusOrder: "diproses pabrik" }, { where: { id: product.id } });
      res.status(200).json({ msg: "Proses di pabrik dimulai" }); // Kirim respons berhasil
    } else {
      res.status(403).json({ msg: "Akses terlarang" }); // Kirim respons akses terlarang
    }
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Kirim respons error jika terjadi kesalahan server
  }
};

// Controller untuk mengupdate harga dan menampilkan berat oleh perusahaan
export const updatePriceAndDisplayWeight = async (req, res) => {
  const { productId, hargaAktual } = req.body;
  try {
    // Cek apakah pengguna memiliki peran perusahaan
    if (req.role !== "perusahaan") {
      return res.status(403).json({ msg: "Akses terlarang" }); // Kirim respons akses terlarang jika pengguna bukan perusahaan
    }

    // Temukan produk berdasarkan ID
    const product = await Product.findOne({
      where: {
        uuid: productId,
      },
    });

    // Kirim respons jika produk tidak ditemukan
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    // Update harga aktual dan status order
    await Product.update(
      {
        hargaAktual: hargaAktual,
        statusOrder: "selesai",
      },
      {
        where: {
          id: product.id,
        },
      }
    );

    // Kirim respons berhasil
    res.status(200).json({ msg: "Harga aktual telah diupdate, produk selesai diproses" });
  } catch (error) {
    // Kirim respons error jika terjadi kesalahan server
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk membuat entri baru di OrderHistory
export const createOrderHistoryEntry = async (orderId, userId, statusOrder, namaLogistik, namaPabrik) => {
  try {
    const orderHistory = await OrderHistory.create({
      orderId,
      userId,
      statusOrder,
      namaLogistik,
      namaPabrik,
      // Tambahkan kolom lain sesuai kebutuhan
    });
    return orderHistory;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk menyelesaikan proses order
export const completeProcessing = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (["admin", "pabrik"].includes(req.role)) {
      // Update status pesanan menjadi 'selesai'
      await Product.update({ statusOrder: "selesai" }, { where: { id: product.id } });

      // Tambahkan entri baru ke OrderHistory
      await createOrderHistoryEntry(product.id, req.userId, "selesai", product.namaLogistik, product.namaPerusahaan);

      res.status(200).json({ msg: "Proses selesai, history order telah ditambahkan" });
    } else {
      res.status(403).json({ msg: "Akses terlarang" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
