import DataLogistik from "../models/DataLogisticModel.js";
import DataPabrik from "../models/DataPabrikModel.js";
import DataPetani from "../models/DataPetaniModel.js";
import LogisticUser from "../models/LogisticUserModel.js";
import PabrikUser from "../models/PabrikUserModel.js";
import PetaniUser from "../models/PetaniUserModel.js";
import OrderPemanen from "../models/OrderPemanenModel.js";
import User from "../models/UserModel.js";
import DataPerusahaan from "../models/DataPerusahaanModel.js";
import PerusahaanUsers from "../models/PerusahaanUserModel.js";

export const searchById = async (req, res) => {
  try {
    const { uuid } = req.params; // Gunakan uuid sebagai parameter pencarian

    // Mencari di model DataPabrik
    let result = await DataPabrik.findOne({
      where: { idPengiriman: uuid },
      include: [{ model: User, attributes: ["name", "email"] }],
    });

    if (!result) {
      // Jika tidak ditemukan di Pabrik, cari di Perusahaan
      result = await DataPerusahaan.findOne({
        where: { idharga: uuid },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    }

    if (!result) {
      // Jika tidak ditemukan di Perusahaan, cari di Petani
      result = await DataPetani.findOne({
        where: { idlahan: uuid },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    }

    if (!result) {
      // Jika tidak ditemukan di Perusahaan, cari di Petani
      result = await DataLogistik.findOne({
        where: { idPengiriman: uuid },
        include: [{ model: User, attributes: ["name", "email"] }],
      });
    }

    if (!result) {
      // Jika tidak ditemukan di Petani, cari di LogisticUser
      result = await LogisticUser.findOne({
        where: { uuid: uuid },
      });
    }

    if (!result) {
      // Jika tidak ditemukan di Petani, cari di LogisticUser
      result = await PerusahaanUsers.findOne({
        where: { uuid: uuid },
      });
    }

    if (!result) {
      // Jika tidak ditemukan di Petani, cari di LogisticUser
      result = await OrderPemanen.findOne({
        where: { uuid: uuid },
      });
    }
    if (!result) {
      // Jika tidak ditemukan di Petani, cari di PabrikUser
      result = await PabrikUser.findOne({
        where: { uuid: uuid },
      });
    }
    if (!result) {
      // Jika tidak ditemukan di Petani, cari di PetaniUser
      result = await PetaniUser.findOne({
        where: { uuid: uuid },
      });
    }
    if (!result) {
      // Jika tidak ditemukan di Petani, cari di User
      result = await User.findOne({
        where: { uuid: uuid },
      });
    }

    if (!result) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error saat mencari data:", error.message);
    res.status(500).json({ msg: error.message });
  }
};
