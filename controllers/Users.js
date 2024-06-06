import User from "../models/UserModel.js";
import argon2 from "argon2";
import PetaniUsers from "../models/PetaniUserModel.js";
import LogisticUser from "../models/LogisticUserModel.js";
import PabrikUser from "../models/PabrikUserModel.js";
import fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads", "img", "profile");

async function deleteFile(filename) {
  const filePath = path.join(uploadDir, filename);
  try {
    console.log(`Memeriksa dan menghapus file: ${filePath}`);
    await fs.unlink(filePath);
    console.log(`File berhasil dihapus: ${filePath}`);
  } catch (error) {
    // Kesalahan saat mencoba mengakses atau menghapus file
    console.error(`Gagal menghapus file ${filename}: ${error.message}`);
  }
}

// Diasumsikan import model dan fungsi lainnya telah dilakukan di bagian atas

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { uuid: req.params.uuid } });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    let fotoFilename;

    switch (user.role.toLowerCase()) {
      case "petani":
        const petani = await PetaniUsers.findOne({ where: { uuid: user.uuid } });
        fotoFilename = petani?.foto;
        await PetaniUsers.destroy({ where: { uuid: user.uuid } });
        break;
      case "logistik":
        const logistik = await LogisticUser.findOne({ where: { uuid: user.uuid } });
        fotoFilename = logistik?.foto;
        await LogisticUser.destroy({ where: { uuid: user.uuid } });
        break;
      case "pabrik":
        const pabrik = await PabrikUser.findOne({ where: { uuid: user.uuid } });
        fotoFilename = pabrik?.foto;
        await PabrikUser.destroy({ where: { uuid: user.uuid } });
        break;
      default:
        console.log("Role pengguna tidak dikenali, tidak ada foto untuk dihapus.");
    }

    if (fotoFilename) {
      await deleteFile(fotoFilename);
    }

    await User.destroy({ where: { uuid: user.uuid } });

    res.status(200).json({ msg: "User berhasil dihapus" });
  } catch (error) {
    console.error("Error saat menghapus user:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role, nohp, alamat } = req.body;
  const foto = req.file ? req.file.filename : ""; // Asumsi foto dikirim dengan field 'foto'

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  }

  try {
    const hashPassword = await argon2.hash(password);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      // Tambahkan atribut lain jika perlu
    });

    const userDetails = {
      uuid: newUser.uuid,
      name,
      email,
      nohp: nohp || "",
      alamat: alamat || "",
      foto: foto, // Simpan nama file foto
      url: `${req.protocol}://${req.get("host")}/profile/profile.png`, // Simpan nama file foto
      password: hashPassword,
    };

    // Menyesuaikan logika berikut berdasarkan role pengguna
    if (role.toLowerCase() === "petani") {
      await PetaniUsers.create(userDetails);
    } else if (role.toLowerCase() === "logistik") {
      await LogisticUser.create(userDetails);
    } else if (role.toLowerCase() === "pabrik") {
      await PabrikUser.create(userDetails);
    }

    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.params.uuid },
      attributes: ["uuid", "name", "email", "role"],
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    // Menyiapkan objek untuk mengembalikan informasi pengguna
    let userDetails = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      role: user.role,
      additionalInfo: {},
    };

    // Mendapatkan informasi tambahan berdasarkan role
    switch (user.role.toLowerCase()) {
      case "petani":
        userDetails.additionalInfo = await PetaniUsers.findOne({ where: { uuid: user.uuid } });
        break;
      case "logistik":
        userDetails.additionalInfo = await LogisticUser.findOne({ where: { uuid: user.uuid } });
        break;
      case "pabrik":
        userDetails.additionalInfo = await PabrikUser.findOne({ where: { uuid: user.uuid } });
        break;
      // Tambahkan case lainnya jika ada lebih banyak role
    }

    res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { uuid } = req.params;
  const { name, email, password, confPassword, role, nohp, alamat } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  }

  try {
    const userToUpdate = await User.findOne({ where: { uuid } });
    if (!userToUpdate) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    let hashPassword = userToUpdate.password;
    if (password && password.trim() !== "") {
      hashPassword = await argon2.hash(password);
    }

    let foto = userToUpdate.foto;
    let url = userToUpdate.url;

    // Jika ada file baru yang diupload, perbarui nama dan URL foto.
    if (req.file) {
      foto = req.file.filename;
      url = `${req.protocol}://${req.get("host")}/profile/${req.file.filename}`;

      // Hapus file foto lama jika ada foto baru dan bukan foto default.
      if (userToUpdate.foto && !userToUpdate.foto.startsWith("defaultProfile.png")) {
        await deleteFile(userToUpdate.foto);
      }
    }

    await User.update(
      {
        name,
        email,
        password: hashPassword,
        role,
        foto, // Nama file foto baru atau yang lama
        url, // URL baru atau yang lama
      },
      { where: { uuid } }
    );

    // Mengupdate detail pengguna berdasarkan role dengan asumsi struktur tabel serupa
    const updateDetails = { name, email, nohp: nohp || "", alamat: alamat || "", foto, url, password: hashPassword };

    switch (role.toLowerCase()) {
      case "petani":
        await PetaniUsers.update(updateDetails, { where: { uuid } });
        break;
      case "logistik":
        await LogisticUser.update(updateDetails, { where: { uuid } });
        break;
      case "pabrik":
        await PabrikUser.update(updateDetails, { where: { uuid } });
        break;
      default:
        console.log("Role pengguna tidak dikenali, update detail pengguna tidak dilakukan.");
        break;
    }

    res.status(200).json({ msg: "User berhasil diperbarui" });
  } catch (error) {
    console.error("Error saat memperbarui user:", error.message);
    res.status(500).json({ msg: error.message });
  }
};
