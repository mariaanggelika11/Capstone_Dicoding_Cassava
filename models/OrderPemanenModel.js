import { Sequelize } from "sequelize"; // Mengimpor Sequelize dari modul sequelize
import db from "../config/Database.js"; // Mengimpor konfigurasi database dari file Database.js
import Users from "./UserModel.js"; // Mengimpor model Users dari file UserModel.js

const { DataTypes } = Sequelize; // Mendestrukturisasi DataTypes dari Sequelize

// Fungsi untuk menghasilkan string acak dengan panjang tertentu
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Karakter yang digunakan untuk string acak
  let result = ""; // Inisialisasi hasil sebagai string kosong
  const charactersLength = characters.length; // Panjang dari karakter yang tersedia
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); // Menambahkan karakter acak ke hasil
  }
  return result; // Mengembalikan hasil
}

// Definisi model OrderPemanen
const OrderPemanen = db.define(
  "order_pemanen", // Nama tabel di database
  {
    uuid: {
      type: DataTypes.STRING, // Tipe data string
      defaultValue: () => `ORD-${generateRandomString(6)}`, // Menggunakan fungsi untuk menambahkan 'ORD-' diikuti oleh string acak
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa kolom ini tidak boleh kosong
      },
    },
    tanggalPemanenan: {
      type: DataTypes.STRING, // Tipe data string
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa kolom ini tidak boleh kosong
        len: [3, 100], // Validasi panjang string antara 3 dan 100 karakter
      },
    },
    statusOrder: {
      type: DataTypes.STRING, // Tipe data string
      defaultValue: "pending", // Nilai default adalah 'pending'
    },
    varietasSingkong: {
      type: DataTypes.STRING, // Tipe data string
    },
    estimasiBerat: {
      type: DataTypes.INTEGER, // Tipe data integer
    },
    estimasiHarga: {
      type: DataTypes.INTEGER, // Tipe data integer
    },
    userId: {
      type: DataTypes.INTEGER, // Tipe data integer
      allowNull: true, // Boleh null
      validate: {
        notEmpty: true, // Validasi bahwa kolom ini tidak boleh kosong
      },
    },
    namaLogistik: {
      type: DataTypes.STRING, // Tipe data string
    },
    noHpLogistik: {
      type: DataTypes.STRING, // Tipe data string
    },
    platnoLogistik: {
      type: DataTypes.STRING, // Tipe data string
    },
    namaPerusahaan: {
      type: DataTypes.STRING, // Tipe data string
    },
    noHpPerusahaan: {
      type: DataTypes.STRING, // Tipe data string
    },
    beratSingkong: {
      type: DataTypes.INTEGER, // Tipe data integer
    },
    beratBatang: {
      type: DataTypes.INTEGER, // Tipe data integer
    },
    beratDaun: {
      type: DataTypes.INTEGER, // Tipe data integer
    },
  },
  {
    freezeTableName: true, // Menggunakan nama tabel sesuai dengan nama model
  }
);

// Hubungan dengan model Users
Users.hasMany(OrderPemanen); // Membuat relasi bahwa setiap user dapat memiliki banyak order pemanen
OrderPemanen.belongsTo(Users, { foreignKey: "userId" }); // Menambahkan foreign key userId pada OrderPemanen yang merujuk ke Users

// Mengekspor model OrderPemanen agar bisa digunakan di bagian lain dari aplikasi
export default OrderPemanen;
