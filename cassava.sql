-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2024 at 07:21 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cassava_speed`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_logistik`
--

CREATE TABLE `data_logistik` (
  `id` int(11) NOT NULL,
  `idPengiriman` varchar(255) NOT NULL,
  `tanggalWaktuPengiriman` datetime NOT NULL,
  `asal` varchar(255) NOT NULL,
  `tujuan` varchar(255) NOT NULL,
  `estimasiWaktuTiba` datetime NOT NULL,
  `nomorPolisiKendaraan` varchar(255) NOT NULL,
  `jenisKendaraan` varchar(255) NOT NULL,
  `kapasitasAngkut` float NOT NULL,
  `biayaTransportasi` float NOT NULL,
  `catatanEfisiensiRute` text DEFAULT NULL,
  `kondisiPengiriman` varchar(255) NOT NULL,
  `catatanDariPenerima` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_logistik`
--

INSERT INTO `data_logistik` (`id`, `idPengiriman`, `tanggalWaktuPengiriman`, `asal`, `tujuan`, `estimasiWaktuTiba`, `nomorPolisiKendaraan`, `jenisKendaraan`, `kapasitasAngkut`, `biayaTransportasi`, `catatanEfisiensiRute`, `kondisiPengiriman`, `catatanDariPenerima`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'LGS-tvzXxD', '2023-03-15 02:00:00', 'Bandar Lampung Universitas Lampung', 'Bandung', '2023-03-15 05:00:00', 'B 1234 XYZ', 'Truk', 5000, 1500000, 'Menggunakan jalan tol untuk menghindari macet', 'Tepat Waktu', 'Pengiriman cepat dan barang dalam kondisi baik', '2024-03-10 17:03:25', '2024-03-15 19:59:43', 6),
(3, 'LGS-qRipR3', '2023-03-15 02:00:00', 'Thailand', 'Bandung', '2023-03-15 05:00:00', 'B 1234 XYZ', 'Truk', 5000, 1500000, 'Menggunakan jalan tol untuk menghindari macet', 'Tepat Waktu', 'Pengiriman cepat dan barang dalam kondisi baik', '2024-03-10 17:14:46', '2024-03-15 19:59:12', 8),
(6, 'LGS-aV9qd4', '2024-03-15 20:00:00', 'Lamtim', 'Balam', '2024-03-15 22:00:00', 'BE 3934 PY', 'Motor', 100, 35000, 'Lewat prapatan lurus belok ke sugar labinta lalu ke itera', 'Baik', 'Diterima dengan baik', '2024-03-15 20:01:14', '2024-03-15 20:01:14', 6);

-- --------------------------------------------------------

--
-- Table structure for table `data_pabrik`
--

CREATE TABLE `data_pabrik` (
  `id` int(11) NOT NULL,
  `tanggalPenerimaan` date NOT NULL,
  `idPengiriman` varchar(255) NOT NULL,
  `beratTotalDiterima` float NOT NULL,
  `evaluasiKualitas` varchar(255) NOT NULL,
  `catatanKualitas` text DEFAULT NULL,
  `kapasitasProduksi` float NOT NULL,
  `produksiHarianTapioka` float NOT NULL,
  `kualitasOutput` varchar(255) NOT NULL,
  `permasalahanOperasional` text DEFAULT NULL,
  `kebutuhanPerbaikan` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_pabrik`
--

INSERT INTO `data_pabrik` (`id`, `tanggalPenerimaan`, `idPengiriman`, `beratTotalDiterima`, `evaluasiKualitas`, `catatanKualitas`, `kapasitasProduksi`, `produksiHarianTapioka`, `kualitasOutput`, `permasalahanOperasional`, `kebutuhanPerbaikan`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, '2023-10-01', 'PBK-FcFDXw', 999, 'Baik', 'Kualitas singkong sangat baik, sedikit kerusakan pada kulit.', 10000, 9500, 'Premium', 'Mesin pengering mengalami kerusakan ringan.', 'Perlu penggantian suku cadang pada mesin pengering.', '2024-03-10 17:54:52', '2024-03-10 17:56:19', 9),
(4, '2023-10-01', 'PBK-n1MLCn', 900, 'Baik', 'Kualitas singkong sangat baik, sedikit kerusakan pada kulit.', 10000, 9500, 'Premium', 'Mesin pengering mengalami kerusakan ringan.', 'Perlu penggantian suku cadang pada mesin pengering.', '2024-03-10 18:02:26', '2024-03-13 13:50:49', 10),
(5, '2024-03-16', 'PBK-726gmV', 12, '123', 'Karena singkongnya bagus maka saya beri nilai 90', 12, 12, '12', '12', '12', '2024-03-15 20:38:33', '2024-03-18 06:35:35', 9);

-- --------------------------------------------------------

--
-- Table structure for table `data_petani`
--

CREATE TABLE `data_petani` (
  `id` int(11) NOT NULL,
  `idlahan` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `lokasilahan` varchar(255) DEFAULT NULL,
  `luaslahan` varchar(255) DEFAULT NULL,
  `statuskepemilikanlahan` varchar(255) DEFAULT NULL,
  `periodeTanamMulai` date NOT NULL,
  `periodeTanamSelesai` date NOT NULL,
  `varietassingkong` varchar(255) DEFAULT NULL,
  `estimasiproduksi` varchar(255) DEFAULT NULL,
  `produksiaktual` varchar(255) DEFAULT NULL,
  `catatantambahan` varchar(255) DEFAULT NULL,
  `jenispupuk` varchar(255) DEFAULT NULL,
  `jumlahpupuk` varchar(255) DEFAULT NULL,
  `hargajual` varchar(255) DEFAULT NULL,
  `totalpendapatan` varchar(255) DEFAULT NULL,
  `pendapatanbersih` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_petani`
--

INSERT INTO `data_petani` (`id`, `idlahan`, `userId`, `lokasilahan`, `luaslahan`, `statuskepemilikanlahan`, `periodeTanamMulai`, `periodeTanamSelesai`, `varietassingkong`, `estimasiproduksi`, `produksiaktual`, `catatantambahan`, `jenispupuk`, `jumlahpupuk`, `hargajual`, `totalpendapatan`, `pendapatanbersih`, `createdAt`, `updatedAt`) VALUES
(9, 'LHN-B3ESHF', 1, 'Singapura', '1200000 Hektar', 'Pribadi', '2024-03-16', '2024-03-16', 'Kasesa', '120TON', '100 Ton', 'Jawa jawa jawa', 'Merah', '120', '12000', '11111', '1000', '2024-03-15 17:51:20', '2024-03-15 18:44:51'),
(10, 'LHN-19Spfa', 13, 'Kemiling Pugung Raharjo', '1233 Hektar', 'Pribadi', '2024-03-16', '2024-03-22', 'Pribadi', '1213', '12131', 'petaninya jawa', 'Pribadi', '123131', '1312', '311313', '31313', '2024-03-15 18:23:06', '2024-03-15 18:45:13'),
(12, 'LHN-NrRQuX', 14, 'Balam', '2121', 'dfdfsd', '2024-03-27', '2024-03-23', 'kasesa', '121', '12', 'fdsdffs', '113', 'dfsfs', 'dfsfds', 'fdsdsf', 'fdsdsf', '2024-03-18 06:38:43', '2024-03-18 06:38:43');

-- --------------------------------------------------------

--
-- Table structure for table `logisticusers`
--

CREATE TABLE `logisticusers` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nohp` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logisticusers`
--

INSERT INTO `logisticusers` (`id`, `uuid`, `name`, `email`, `nohp`, `alamat`, `foto`, `url`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'USR-FVeWpl', 'logistik Speed', 'logistik@gmail.com', '082281907489', 'east lampung, lampung, indonesia', '2024-03-13T16-47-31.989Z-_4ea0bb82-ac04-45fe-adf0-1586b960f72c.jpeg', 'http://localhost:5000/profile/2024-03-13T16-47-31.989Z-_4ea0bb82-ac04-45fe-adf0-1586b960f72c.jpeg', '$argon2id$v=19$m=4096,t=3,p=1$kVTQ/LAEhCKW3K5h65ToVw$CXncsNKsGoZFXR8q60wK3vGF87MnGJFepsUJx3maKPY', '2024-03-09 06:11:31', '2024-03-15 19:13:14'),
(2, 'USR-TgXCHJ', 'Kuningan Fly', 'logistik1@gmail.com', '08122112', 'east lampung, lampung, indonesia', '2024-03-18T06-43-27.399Z-ivan-shimko-tCp2K2sYpFg-unsplash.jpg', 'http://localhost:5000/profile/2024-03-18T06-43-27.399Z-ivan-shimko-tCp2K2sYpFg-unsplash.jpg', '$argon2id$v=19$m=4096,t=3,p=1$xHklpsb/6hvw0VSzt8zoZA$hMM25H5vvSlFsl5TtUuX5LfnYpA7minQEEqIaS9Xym0', '2024-03-10 17:13:57', '2024-03-18 06:43:27');

-- --------------------------------------------------------

--
-- Table structure for table `order_pemanen`
--

CREATE TABLE `order_pemanen` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `tanggalPemanenan` varchar(255) NOT NULL,
  `statusOrder` varchar(255) DEFAULT 'pending',
  `varietasSingkong` varchar(255) DEFAULT NULL,
  `estimasiBerat` int(11) DEFAULT NULL,
  `estimasiHarga` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `namaLogistik` varchar(255) DEFAULT NULL,
  `noHpLogistik` varchar(255) DEFAULT NULL,
  `platnoLogistik` varchar(255) DEFAULT NULL,
  `namaPerusahaan` varchar(255) DEFAULT NULL,
  `noHpPerusahaan` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_pemanen`
--

INSERT INTO `order_pemanen` (`id`, `uuid`, `tanggalPemanenan`, `statusOrder`, `varietasSingkong`, `estimasiBerat`, `estimasiHarga`, `userId`, `namaLogistik`, `noHpLogistik`, `platnoLogistik`, `namaPerusahaan`, `noHpPerusahaan`, `createdAt`, `updatedAt`) VALUES
(1, 'ORD-80ubML', '2022-03-15', 'pending', 'RUGPULL', 100, 100000, 10, 'PT EXPRESS', '082281907489', 'BE 1234 XYZ', 'PT BEST', '0812341234', '2024-03-12 15:27:29', '2024-03-12 15:27:29'),
(6, 'ORD-Ktm8ds', '2024-03-01', 'disetujui', 'kasesa', 1345, 12000, 12, 'Jaya Express', '0811223344', 'BE JY 47', 'Gulaku', '089909090', '2024-03-13 10:23:29', '2024-03-13 12:27:20'),
(7, 'ORD-xbElZz', '2024-03-14', 'disetujui', 'Thailand', 12, 1500, 12, 'Paijo Express', '081212394051', 'BE 471 Y', 'Gulaku', '082281918822', '2024-03-13 13:40:52', '2024-03-13 13:43:30'),
(8, 'ORD-30Xd96', '2024-03-13', 'disetujui', '1234', 1122, 12000, 13, 'PT Hayuk', '0811223345', 'BE 3344 AP', 'PT Best', '082212123345', '2024-03-13 15:58:23', '2024-03-13 16:00:12'),
(9, 'ORD-mT9BbI', '2024-03-31', 'disetujui', 'CUAN', 129, 1000, 13, 'kopiko express', '081223344545', 'BE 4565 kl', 'PT Best', '0812131415165', '2024-03-13 16:15:05', '2024-03-15 15:01:29'),
(10, 'ORD-a8nZmI', '2024-03-30', 'ditolak', 'Kasesa', 120, 1000, 14, 'PT Lambo', '0812121212', 'BE L4MB', 'PT Best', '0812121212', '2024-03-18 06:37:46', '2024-03-18 06:48:16'),
(11, 'ORD-zhOQqD', '2024-03-23', 'disetujui', 'kasesa', 12, 1000, 13, 'tersew', '0812121', 'BE 1231', 'PT sejahtera', '08121212', '2024-03-18 08:13:22', '2024-03-18 08:18:11'),
(12, 'ORD-EQwIsw', '2024-03-30', 'disetujui', 'fsds', 123, 12345, 13, NULL, NULL, NULL, 'sdadsa', '1231', '2024-03-22 04:27:29', '2024-03-22 04:28:55');

-- --------------------------------------------------------

--
-- Table structure for table `pabrikusers`
--

CREATE TABLE `pabrikusers` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nohp` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pabrikusers`
--

INSERT INTO `pabrikusers` (`id`, `uuid`, `name`, `email`, `nohp`, `alamat`, `foto`, `url`, `password`, `createdAt`, `updatedAt`) VALUES
(4, 'USR-HIuUZ6', 'PT Kripto', 'pabrik@gmail.com', '082281907489', 'Lampung Timur', '2024-03-22T04-24-48.825Z-15-twibbon-hut-pdi-perjuangan-bisa-diunggah-di-media-sosial_169.jpeg', 'http://localhost:5000/profile/2024-03-22T04-24-48.825Z-15-twibbon-hut-pdi-perjuangan-bisa-diunggah-di-media-sosial_169.jpeg', '$argon2id$v=19$m=4096,t=3,p=1$6Hw9c7/hGts1n0J7ZupoqQ$h0wJXOsz7zin1gWsY0bswySgYHg7qH0KSzMSzptkLPg', '2024-03-10 17:52:54', '2024-03-22 04:24:48'),
(5, 'USR-C0ty0g', 'PT best go berkah No Riba', 'pabrik1@gmail.com', '081234562211', 'bandung utara', '2024-03-11T15-03-03.991Z-2021-11-05.png', 'http://localhost:5000/profile/2024-03-11T15-03-03.991Z-2021-11-05.png', '$argon2id$v=19$m=4096,t=3,p=1$GpO1s5jfdr+JtgwTJ6gxzw$+/NqogT8QI8YBiI86pDHYGN3lkIk49W7S3lnBLZa+68', '2024-03-10 17:59:50', '2024-03-11 15:03:03');

-- --------------------------------------------------------

--
-- Table structure for table `petaniusers`
--

CREATE TABLE `petaniusers` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nohp` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `petaniusers`
--

INSERT INTO `petaniusers` (`id`, `uuid`, `name`, `email`, `nohp`, `alamat`, `foto`, `url`, `password`, `createdAt`, `updatedAt`) VALUES
(2, 'USR-vJzF8p', 'Ir. Randu', 'petani1@gmail.com', '', '', '', 'http://localhost:5000/profile/profile.png', '$argon2id$v=19$m=4096,t=3,p=1$mITYKSjfwJTeuNcGDzo4tA$3nv5xiTErtN6bKaSw95Xoe47loymtz2jE13m43FOLJs', '2024-03-09 07:22:45', '2024-03-09 07:22:45'),
(3, 'USR-e7DZAn', 'Wawan Petani', 'petani2@gmail.com', '', '', '', 'http://localhost:5000/profile/profile.png', '$argon2id$v=19$m=4096,t=3,p=1$X2kYbDcogglF4LQb7l5xvw$tMkzwJyv+dZtas4wJJIDSUZMqYRGgjKtYVm4RZUgOZg', '2024-03-13 09:05:21', '2024-03-13 09:05:21'),
(4, 'USR-j4GZSR', 'Petani Banteng', 'petani@gmail.com', '082281907489', 'east lampung, lampung, indonesia', '2024-03-18T08-07-20.335Z-15-twibbon-hut-pdi-perjuangan-bisa-diunggah-di-media-sosial_169.jpeg', 'http://localhost:5000/profile/2024-03-18T08-07-20.335Z-15-twibbon-hut-pdi-perjuangan-bisa-diunggah-di-media-sosial_169.jpeg', '$argon2id$v=19$m=4096,t=3,p=1$y5xX7MfPEnlv3D461vKcdA$X0AdYf01bU4yyv0rqnhA7FtjpQegZMIT/P/nqzdzbjg', '2024-03-13 15:39:56', '2024-03-18 08:07:20'),
(5, 'USR-7MvRQy', 'Dwi Aji Cahyono', 'aji@gmail.com', '082281907489', 'east lampung, lampung, indonesia', '2024-03-18T06-37-15.842Z-15-twibbon-hut-pdi-perjuangan-bisa-diunggah-di-media-sosial_169.jpeg', 'http://localhost:5000/profile/2024-03-18T06-37-15.842Z-15-twibbon-hut-pdi-perjuangan-bisa-diunggah-di-media-sosial_169.jpeg', '$argon2id$v=19$m=4096,t=3,p=1$DL19A+bUw8j4j48Tgxxu2A$rkF2xlGqYkmEpydPurSbsssm0NR3hYF9q4WXNwvwPIw', '2024-03-18 06:36:21', '2024-03-18 06:37:15'),
(6, 'USR-ExrlQ5', 'surya', 'surya@gmail.com', '', '', '', 'http://localhost:5000/profile/profile.png', '$argon2id$v=19$m=4096,t=3,p=1$mJTijSuET9DvL3lrBhb8sA$KxlnYklACqqOv2/9FicoefqT8dFLdJ3jsPstWB88xjA', '2024-03-22 04:32:39', '2024-03-22 04:32:39');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('2bjEGllx6hynxAM5ndhoGnNIMor8qeG4', '2024-03-23 04:24:48', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:24:48', '2024-03-22 04:24:48'),
('4KQ5jujlkPmnm55_cj49jY_zfOYaiMhM', '2024-03-23 04:27:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:27:29', '2024-03-22 04:27:29'),
('9bqlNb5Br2c3Vk3RA7ow2V8LJerM6pDi', '2024-03-27 08:04:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-26 08:04:30', '2024-03-26 08:04:30'),
('aK8zMd2xMRMLe-YgiYidWwbr7ESe5oM5', '2024-03-23 04:32:10', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:32:10', '2024-03-22 04:32:10'),
('bgi6D90-wms0XeHjkMXVNn1ZJccFSV8Y', '2024-03-23 04:28:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:28:34', '2024-03-22 04:28:34'),
('CYgQw5DJZ1jaTEXAbkkjVG7si_UMvzg9', '2024-03-23 04:28:26', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:28:26', '2024-03-22 04:28:26'),
('dRiEMbv-5aZODL_k5n8kiXH8Vrn4HRfv', '2024-03-23 04:32:19', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:32:19', '2024-03-22 04:32:19'),
('DT4JF7myY7QKwmXhxYOe1fnV5qHpIJ9l', '2024-03-23 04:40:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"USR-SVIKRS\"}', '2024-03-22 04:39:52', '2024-03-22 04:40:12'),
('HE2V5FM_sGgl-X4u41Yif4maxM8UmDVV', '2024-03-23 04:22:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:22:12', '2024-03-22 04:22:12'),
('hhNOvPnvj8qIrSBpC61iIW985CMC4kbG', '2024-03-23 04:33:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:33:09', '2024-03-22 04:33:09'),
('Ikw3k5khNJMEn1tQGu3fA0Qlhv1lB2Nn', '2024-03-27 08:05:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"USR-SVIKRS\"}', '2024-03-26 08:04:30', '2024-03-26 08:05:30'),
('iRwJUaFQYD_c7hAF3fVbgMSBBdap8ik1', '2024-03-23 04:29:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:29:42', '2024-03-22 04:29:42'),
('NBd1etbFiHsrgafg1PyX_aPxYiq0cjRS', '2024-03-23 04:25:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:25:29', '2024-03-22 04:25:29'),
('OjXS7mq820FRddRqNvRJbkvQxdKKlktz', '2024-03-23 04:32:39', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:32:39', '2024-03-22 04:32:39'),
('PZ0JXIKX4xiGwcWJVL4trQCK0T-_Ed7A', '2024-03-23 04:24:14', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:24:14', '2024-03-22 04:24:14'),
('SCQen5sQ5zdWjhUrBFJubx7fmJ7dEjAq', '2024-03-23 04:25:44', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:25:44', '2024-03-22 04:25:44'),
('spWMqd1fh1MaDRfQgHCuit6kHRK2EEuk', '2024-03-23 04:32:48', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:32:48', '2024-03-22 04:32:48'),
('TOMa-y6_WbiSyI9-onolKDcFdVOSraun', '2024-03-23 04:26:50', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:26:50', '2024-03-22 04:26:50'),
('TwcvuENIdp5fZv1lJVEADJxBe1qAtCQb', '2024-03-23 04:28:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:28:55', '2024-03-22 04:28:55'),
('Uto2cxAu1HtW70fi19Fafi9V9P909RSI', '2024-03-23 04:33:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"USR-ExrlQ5\"}', '2024-03-22 04:32:51', '2024-03-22 04:33:42'),
('vJRS1o16GGLNsvZQcdohKvflvk6gxFP_', '2024-03-23 04:24:26', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:24:26', '2024-03-22 04:24:26'),
('wgDlRZpf9-Q-jErwJmQWvPStCDIXQd-c', '2024-03-23 04:27:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:27:03', '2024-03-22 04:27:03'),
('Z5rw1RLC5ADRo4fokBmnSbJbL1MLy3Oy', '2024-03-23 04:29:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-03-22 04:29:30', '2024-03-22 04:29:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'USR-SVIKRS', 'Admin Ganteng', 'admin@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$AM+v7876/RI5lZXzloVYAA$gKO385umk8aGYmep92DKV9c+Hw02KlkqYhNRyMCGbgE', 'admin', '2024-03-09 04:18:51', '2024-03-09 04:18:51'),
(6, 'USR-FVeWpl', 'logistik Speed', 'logistik@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$kVTQ/LAEhCKW3K5h65ToVw$CXncsNKsGoZFXR8q60wK3vGF87MnGJFepsUJx3maKPY', 'logistik', '2024-03-09 06:11:31', '2024-03-15 19:13:14'),
(7, 'USR-vJzF8p', 'Ir. Randu', 'petani1@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$mITYKSjfwJTeuNcGDzo4tA$3nv5xiTErtN6bKaSw95Xoe47loymtz2jE13m43FOLJs', 'petani', '2024-03-09 07:22:45', '2024-03-09 07:22:45'),
(8, 'USR-TgXCHJ', 'Kuningan Fly', 'logistik1@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$xHklpsb/6hvw0VSzt8zoZA$hMM25H5vvSlFsl5TtUuX5LfnYpA7minQEEqIaS9Xym0', 'logistik', '2024-03-10 17:13:57', '2024-03-18 06:43:27'),
(9, 'USR-HIuUZ6', 'PT Kripto', 'pabrik@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$6Hw9c7/hGts1n0J7ZupoqQ$h0wJXOsz7zin1gWsY0bswySgYHg7qH0KSzMSzptkLPg', 'pabrik', '2024-03-10 17:52:54', '2024-03-22 04:24:48'),
(10, 'USR-C0ty0g', 'PT best go berkah No Riba', 'pabrik1@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$GpO1s5jfdr+JtgwTJ6gxzw$+/NqogT8QI8YBiI86pDHYGN3lkIk49W7S3lnBLZa+68', 'pabrik', '2024-03-10 17:59:50', '2024-03-11 15:03:03'),
(12, 'USR-e7DZAn', 'Wawan Petani', 'petani2@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$X2kYbDcogglF4LQb7l5xvw$tMkzwJyv+dZtas4wJJIDSUZMqYRGgjKtYVm4RZUgOZg', 'petani', '2024-03-13 09:05:21', '2024-03-13 09:05:21'),
(13, 'USR-j4GZSR', 'Petani Banteng', 'petani@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$y5xX7MfPEnlv3D461vKcdA$X0AdYf01bU4yyv0rqnhA7FtjpQegZMIT/P/nqzdzbjg', 'petani', '2024-03-13 15:39:56', '2024-03-18 08:07:20'),
(14, 'USR-7MvRQy', 'Dwi Aji Cahyono', 'aji@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$DL19A+bUw8j4j48Tgxxu2A$rkF2xlGqYkmEpydPurSbsssm0NR3hYF9q4WXNwvwPIw', 'petani', '2024-03-18 06:36:21', '2024-03-18 06:37:15'),
(15, 'USR-ExrlQ5', 'surya', 'surya@gmail.com', '$argon2id$v=19$m=4096,t=3,p=1$mJTijSuET9DvL3lrBhb8sA$KxlnYklACqqOv2/9FicoefqT8dFLdJ3jsPstWB88xjA', 'petani', '2024-03-22 04:32:39', '2024-03-22 04:32:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_logistik`
--
ALTER TABLE `data_logistik`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idPengiriman` (`idPengiriman`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `data_pabrik`
--
ALTER TABLE `data_pabrik`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `data_petani`
--
ALTER TABLE `data_petani`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `logisticusers`
--
ALTER TABLE `logisticusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_pemanen`
--
ALTER TABLE `order_pemanen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `pabrikusers`
--
ALTER TABLE `pabrikusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `petaniusers`
--
ALTER TABLE `petaniusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_logistik`
--
ALTER TABLE `data_logistik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `data_pabrik`
--
ALTER TABLE `data_pabrik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `data_petani`
--
ALTER TABLE `data_petani`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `logisticusers`
--
ALTER TABLE `logisticusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_pemanen`
--
ALTER TABLE `order_pemanen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `pabrikusers`
--
ALTER TABLE `pabrikusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `petaniusers`
--
ALTER TABLE `petaniusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_logistik`
--
ALTER TABLE `data_logistik`
  ADD CONSTRAINT `data_logistik_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `data_pabrik`
--
ALTER TABLE `data_pabrik`
  ADD CONSTRAINT `data_pabrik_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `data_petani`
--
ALTER TABLE `data_petani`
  ADD CONSTRAINT `data_petani_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_pemanen`
--
ALTER TABLE `order_pemanen`
  ADD CONSTRAINT `order_pemanen_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
