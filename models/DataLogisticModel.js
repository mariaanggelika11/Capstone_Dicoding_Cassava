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

const Logistik = db.define(
  "data_logistik",
  {
    idPengiriman: {
      type: DataTypes.STRING,
      defaultValue: () => `LGS-${generateRandomString(6)}`,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tanggalWaktuPengiriman: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    asal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tujuan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    estimasiWaktuTiba: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nomorPolisiKendaraan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jenisKendaraan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kapasitasAngkut: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    biayaTransportasi: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        isFloat: true, // Memastikan input adalah angka
      },
    },
    catatanEfisiensiRute: {
      type: DataTypes.TEXT,
      allowNull: true, // Boleh kosong
    },
    kondisiPengiriman: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    catatanDariPenerima: {
      type: DataTypes.TEXT,
      allowNull: true, // Boleh kosong
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Logistik);
Logistik.belongsTo(Users, { foreignKey: "userId" });

export default Logistik;
