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

const OrderPemanen = db.define(
  "order_pemanen",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: () => `ORD-${generateRandomString(6)}`, // Menggunakan fungsi untuk menambahkan 'PT-' diikuti oleh string acak
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tanggalPemanenan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    statusOrder: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    varietasSingkong: DataTypes.STRING,
    estimasiBerat: DataTypes.INTEGER,
    estimasiHarga: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    namaLogistik: DataTypes.STRING,
    noHpLogistik: DataTypes.STRING,
    platnoLogistik: DataTypes.STRING,
    namaPerusahaan: DataTypes.STRING,
    noHpPerusahaan: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(OrderPemanen);
OrderPemanen.belongsTo(Users, { foreignKey: "userId" });

export default OrderPemanen;
