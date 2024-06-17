import { Sequelize } from "sequelize"; // Mengimpor Sequelize dari modul sequelize
import db from "../config/Database.js"; // Mengimpor konfigurasi database dari file Database.js

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

// Definisi model PerusahaanUsers
const PerusahaanUser = db.define(
  "perusahaanusers", // Nama tabel di database
  {
    uuid: {
      type: DataTypes.STRING, // Tipe data string
      defaultValue: () => `PRN-${generateRandomString(6)}`, // Menggunakan fungsi untuk menambahkan 'PBR-' diikuti oleh string acak
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa kolom ini tidak boleh kosong
      },
    },
    name: {
      type: DataTypes.STRING, // Tipe data string
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa kolom ini tidak boleh kosong
        len: [3, 100], // Validasi panjang string antara 3 dan 100 karakter
      },
    },
    email: {
      type: DataTypes.STRING, // Tipe data string
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa kolom ini tidak boleh kosong
        isEmail: true, // Validasi bahwa kolom ini harus berupa email yang valid
      },
    },
    nohp: {
      type: DataTypes.STRING, // Tipe data string
    },
    alamat: {
      type: DataTypes.STRING, // Tipe data string
    },
    foto: {
      type: DataTypes.STRING, // Tipe data string
    },
    url: {
      type: DataTypes.STRING, // Tipe data string
    },
    password: {
      type: DataTypes.STRING, // Tipe data string
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa kolom ini tidak boleh kosong
      },
    },
  },
  {
    freezeTableName: true, // Menggunakan nama tabel sesuai dengan nama model
  }
);

// Mengekspor model PerusahaanUsers agar bisa digunakan di bagian lain dari aplikasi
export default PerusahaanUser;
