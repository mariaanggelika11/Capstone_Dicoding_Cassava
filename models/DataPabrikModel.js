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

// Definisi model Pabrik
const Pabrik = db.define(
  "data_pabrik", // Nama tabel di database
  {
    tanggalPenerimaan: {
      type: DataTypes.DATEONLY, // Tipe data tanggal (hanya tanggal, tanpa waktu)
      allowNull: false, // Tidak boleh null
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    idPengiriman: {
      type: DataTypes.STRING,
      defaultValue: () => `PBK-${generateRandomString(6)}`, // Menghasilkan ID pengiriman acak dengan prefix 'PBK-'
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    beratTotalDiterima: {
      type: DataTypes.FLOAT, // Tipe data float (angka desimal)
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    evaluasiKualitas: {
      type: DataTypes.STRING, // Misal: 'Baik', 'Cukup', 'Kurang'
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    catatanKualitas: {
      type: DataTypes.TEXT, // Tipe data teks (panjang)
      allowNull: true, // Boleh kosong
    },
    kapasitasProduksi: {
      type: DataTypes.FLOAT, // Tipe data float (angka desimal)
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    produksiHarianTapioka: {
      type: DataTypes.FLOAT, // Tipe data float (angka desimal)
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    kualitasOutput: {
      type: DataTypes.STRING, // Misal: 'Standard', 'Premium'
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi bahwa nilai tidak boleh kosong
      },
    },
    permasalahanOperasional: {
      type: DataTypes.TEXT, // Tipe data teks (panjang)
      allowNull: true, // Boleh kosong
    },
    kebutuhanPerbaikan: {
      type: DataTypes.TEXT, // Tipe data teks (panjang)
      allowNull: true, // Boleh kosong
    },
  },
  {
    freezeTableName: true, // Nama tabel tidak akan diubah secara otomatis menjadi bentuk jamak oleh Sequelize
  }
);

// Membuat relasi antara Users dan Pabrik
Users.hasMany(Pabrik); // User memiliki banyak data pabrik
Pabrik.belongsTo(Users, { foreignKey: "userId" }); // Data pabrik milik satu user, dengan userId sebagai foreign key

export default Pabrik; // Mengekspor model Pabrik agar bisa digunakan di bagian lain dari aplikasi
