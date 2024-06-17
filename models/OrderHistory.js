import { DataTypes } from "sequelize"; // Mengimpor DataTypes dari modul sequelize
import db from "../config/Database.js"; // Mengimpor konfigurasi database dari file Database.js

// Definisi model OrderHistory
const OrderHistory = db.define(
  "OrderHistory", // Nama model
  {
    id: {
      type: DataTypes.INTEGER, // Tipe data integer
      primaryKey: true, // Menjadikan kolom ini sebagai primary key
      autoIncrement: true, // Nilai akan diincrement secara otomatis
    },
    orderId: {
      type: DataTypes.INTEGER, // Tipe data integer
      allowNull: false, // Tidak boleh null
    },
    userId: {
      type: DataTypes.INTEGER, // Tipe data integer
      allowNull: false, // Tidak boleh null
    },
    statusOrder: {
      type: DataTypes.STRING, // Tipe data string
      allowNull: false, // Tidak boleh null
    },
    namaLogistik: {
      type: DataTypes.STRING, // Tipe data string
    },
    namaPabrik: {
      type: DataTypes.STRING, // Tipe data string
    },
    // Tambahkan kolom lain sesuai kebutuhan
  },
  {
    tableName: "order_history", // Nama tabel di database
    timestamps: true, // Menambahkan kolom createdAt dan updatedAt secara otomatis
  }
);

// Sinkronkan model dengan database
OrderHistory.sync()
  .then(() => {
    console.log("Tabel OrderHistory telah dibuat jika belum ada.");
  })
  .catch((err) => {
    console.error("Gagal membuat tabel OrderHistory:", err);
  });

// Export model OrderHistory
export default OrderHistory; // Mengekspor model OrderHistory agar bisa digunakan di bagian lain dari aplikasi
