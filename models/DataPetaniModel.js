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

const Petani = db.define(
  "data_petani",
  {
    idlahan: {
      type: DataTypes.STRING,
      defaultValue: () => `LHN-${generateRandomString(6)}`,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lokasilahan: DataTypes.STRING,
    luaslahan: DataTypes.STRING,
    statuskepemilikanlahan: DataTypes.STRING,
    periodeTanamMulai: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    periodeTanamSelesai: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    varietassingkong: DataTypes.STRING,
    estimasiproduksi: DataTypes.STRING,
    produksiaktual: DataTypes.STRING,
    catatantambahan: DataTypes.STRING,
    jenispupuk: DataTypes.STRING,
    jumlahpupuk: DataTypes.STRING,
    hargajual: DataTypes.STRING,
    totalpendapatan: DataTypes.STRING,
    pendapatanbersih: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
Users.hasMany(Petani);
Petani.belongsTo(Users, { foreignKey: "userId" });

export default Petani;
