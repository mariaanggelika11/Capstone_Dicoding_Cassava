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

const Pabrik = db.define(
  "data_pabrik",
  {
    tanggalPenerimaan: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idPengiriman: {
      type: DataTypes.STRING,
      defaultValue: () => `PBK-${generateRandomString(6)}`,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    beratTotalDiterima: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    evaluasiKualitas: {
      type: DataTypes.STRING, // Misal: 'Baik', 'Cukup', 'Kurang'
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    catatanKualitas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    kapasitasProduksi: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    produksiHarianTapioka: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kualitasOutput: {
      type: DataTypes.STRING, // Misal: 'Standard', 'Premium'
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    permasalahanOperasional: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    kebutuhanPerbaikan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Membuat relasi antara Users dan Pabrik
Users.hasMany(Pabrik);
Pabrik.belongsTo(Users, { foreignKey: "userId" });

export default Pabrik;
