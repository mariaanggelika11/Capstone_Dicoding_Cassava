import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

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

// Definisi model DataPerusahaan
const Perusahaan = db.define(
  "data_perusahaan", // Nama tabel di database
  {
    tanggalupdateharga: {
      type: DataTypes.DATEONLY, // Tipe data tanggal (hanya tanggal, tanpa waktu)
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    idharga: {
      type: DataTypes.STRING,
      defaultValue: () => `PRS-${generateRandomString(6)}`, // Menghasilkan ID harga acak dengan prefix 'PRS-'
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    hargaGradeA: {
      type: DataTypes.FLOAT, // Tipe data float (angka desimal)
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    hargaGradeB: {
      type: DataTypes.FLOAT, // Tipe data float (angka desimal)
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    hargaGradeC: {
      type: DataTypes.FLOAT, // Tipe data float (angka desimal)
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    catatan: {
      type: DataTypes.TEXT, // Tipe data teks (panjang)
      allowNull: true, // Boleh kosong
    },
  },
  {
    freezeTableName: true, // Nama tabel tidak akan diubah secara otomatis menjadi bentuk jamak oleh Sequelize
  }
);

// Membuat relasi antara Users dan DataPerusahaan
Users.hasMany(Perusahaan); // User memiliki banyak data perusahaan
Perusahaan.belongsTo(Users, { foreignKey: "userId" }); // Data perusahaan milik satu user, dengan userId sebagai foreign key

export default Perusahaan; // Mengekspor model DataPerusahaan agar bisa digunakan di bagian lain dari aplikasi
