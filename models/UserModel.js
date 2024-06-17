import { Sequelize } from "sequelize"; // Mengimpor Sequelize dari modul sequelize
import db from "../config/Database.js"; // Mengimpor konfigurasi database dari file Database.js

const { DataTypes } = Sequelize; // Mendestrukturisasi DataTypes dari Sequelize

// Fungsi untuk menghasilkan string acak dengan panjang tertentu
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Mendefinisikan model Users
const Users = db.define(
  "users", // Nama tabel di database
  {
    uuid: {
      type: DataTypes.STRING, // Tipe data string
      defaultValue: () => `USR-${generateRandomString(6)}`, // Menggunakan fungsi untuk menambahkan 'USR-' diikuti oleh string acak
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
    password: {
      type: DataTypes.STRING, // Tipe data string
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa kolom ini tidak boleh kosong
      },
    },
    role: {
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

// Mengekspor model Users agar bisa digunakan di bagian lain dari aplikasi
export default Users;
