import { Sequelize } from "sequelize"; // Mengimpor Sequelize dari modul sequelize
import db from "../config/Database.js"; // Mengimpor konfigurasi database dari file Database.js

const { DataTypes } = Sequelize; // Mengambil DataTypes dari Sequelize untuk mendefinisikan tipe data pada model

// Fungsi untuk menghasilkan string acak dengan panjang tertentu
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Karakter yang digunakan untuk menghasilkan string acak
  let result = ""; // Variabel untuk menyimpan hasil string acak
  const charactersLength = characters.length; // Panjang dari karakter yang digunakan
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); // Memilih karakter acak dari characters dan menambahkannya ke result
  }
  return result; // Mengembalikan string acak
}

// Definisi model LogisticUser
const LogisticUser = db.define(
  "logisticusers", // Nama tabel di database
  {
    uuid: {
      type: DataTypes.STRING, // Tipe data string
      defaultValue: () => `LGS-${generateRandomString(6)}`, // Menghasilkan UUID acak dengan prefix 'LGS-' dan string acak
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    name: {
      type: DataTypes.STRING, // Tipe data string
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
        len: [3, 100], // Panjang nilai harus antara 3 hingga 100 karakter
      },
    },
    email: {
      type: DataTypes.STRING, // Tipe data string
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
        isEmail: true, // Validasi bahwa nilai harus berupa email yang valid
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
    url: DataTypes.STRING, // Tipe data string
    password: {
      type: DataTypes.STRING, // Tipe data string
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
  },
  {
    freezeTableName: true, // Nama tabel tidak akan diubah secara otomatis menjadi bentuk jamak oleh Sequelize
  }
);

export default LogisticUser; // Mengekspor model LogisticUser agar bisa digunakan di bagian lain dari aplikasi
