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

// Definisi model Petani
const Petani = db.define(
  "data_petani", // Nama tabel di database
  {
    idlahan: {
      type: DataTypes.STRING, // Tipe data string
      defaultValue: () => `LHN-${generateRandomString(6)}`, // Menghasilkan ID lahan acak dengan prefix 'LHN-'
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    userId: {
      type: DataTypes.INTEGER, // Tipe data integer
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    lokasilahan: DataTypes.STRING, // Tipe data string
    luaslahan: DataTypes.STRING, // Tipe data string
    statuskepemilikanlahan: DataTypes.STRING, // Tipe data string
    periodeTanamMulai: {
      type: DataTypes.DATEONLY, // Tipe data tanggal (hanya tanggal, tanpa waktu)
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    periodeTanamSelesai: {
      type: DataTypes.DATEONLY, // Tipe data tanggal (hanya tanggal, tanpa waktu)
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    varietassingkong: DataTypes.STRING, // Tipe data string
    estimasiproduksi: DataTypes.STRING, // Tipe data string
    produksiaktual: DataTypes.STRING, // Tipe data string
    catatantambahan: DataTypes.STRING, // Tipe data string
    jenispupuk: DataTypes.STRING, // Tipe data string
    jumlahpupuk: DataTypes.STRING, // Tipe data string
  },
  {
    freezeTableName: true, // Nama tabel tidak akan diubah secara otomatis menjadi bentuk jamak oleh Sequelize
  }
);

// Membuat relasi antara Users dan Petani
Users.hasMany(Petani); // User memiliki banyak data petani
Petani.belongsTo(Users, { foreignKey: "userId" }); // Data petani milik satu user, dengan userId sebagai foreign key

export default Petani; // Mengekspor model Petani agar bisa digunakan di bagian lain dari aplikasi
