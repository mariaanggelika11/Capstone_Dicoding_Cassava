import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import { format } from 'date-fns';

const ListDataLogistik = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState([]);
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
        if (user?.uuid) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`https://c-greenproject.org:8000/users/${user.uuid}`);
                    setUserAuth(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [user?.uuid]); // Tambahkan user?.uuid sebagai dependency untuk lebih aman

    useEffect(() => {
        if (user?.uuid) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`https://c-greenproject.org:8000/logistik`);
                    setUserData(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [user?.uuid]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && user.role !== "logistik") {
            navigate("/data-logistik");
        }

    }, [isError, user, navigate]);

    const deleteProduct = async (id) => {
        // Tampilkan dialog konfirmasi penghapusan
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`https://c-greenproject.org:8000/logistik/${id}`);
                const updatedUserData = userData.filter(data => data.id !== id);
                setUserData(updatedUserData);
                alert("Data berhasil dihapus.");
            } catch (error) {
                console.error("Error deleting data:", error);
                alert("Terjadi kesalahan saat menghapus data.");
            }
        }
    };



    return (
<>
<style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>

<Layout>
    <div className="container">
        <h4 className="gradient-text fw-bold">Data Logistik</h4>
        <Link to="/data-logistik/add" className="btn btn-primary btn-sm mb-3">
            Tambah Data Baru
        </Link>
        {userData.length > 0 ? (
            <div className="row" style={{ fontSize: "0.9rem" }}>
                {userData.map((data, index) => (
                    <div key={index} className="col-md-6 mb-3">
                        <div className="card shadow">
                            <div className="card-body p-3">
                                {user && userAuth?.role === "admin" && (
                                    <div className="mb-2">
                                        <h5 className="card-title gradient-text mb-1">Nama Petani: {data.user.name}</h5>
                                        <h5 className="card-title gradient-text mb-1">Email Petani: {data.user.email}</h5>
                                    </div>
                                )}
                                <div className="mb-2">
                                    <div className="border p-3 mb-3">
                                        <h5 className="card-title gradient-text fw-bold">Detail Pengiriman</h5>
                                        <p className="mb-1"><strong className="gradient-text">ID Pengiriman:</strong> {data.idPengiriman}</p>
                                        <p className="mb-1"><strong className="gradient-text">Tanggal/Waktu Pengiriman:</strong>{format(new Date(data.tanggalWaktuPengiriman), 'yyyy-MM-dd HH:mm:ss')}</p>
                                        <p className="mb-1"><strong className="gradient-text">Asal:</strong> {data.asal}</p>
                                        <p className="mb-1"><strong className="gradient-text">Tujuan:</strong> {data.tujuan}</p>
                                    </div>

                                    <div className="border p-3 mb-3">
                                        <h5 className="card-title gradient-text fw-bold">Detail Kendaraan</h5>
                                        <p className="mb-1"><strong className="gradient-text">Estimasi Waktu Tiba:</strong>{format(new Date(data.estimasiWaktuTiba), 'yyyy-MM-dd HH:mm:ss')}</p>
                                        <p className="mb-1"><strong className="gradient-text">Nomor Polisi Kendaraan:</strong> {data.nomorPolisiKendaraan}</p>
                                        <p className="mb-1"><strong className="gradient-text">Jenis Kendaraan:</strong> {data.jenisKendaraan}</p>
                                        <p className="mb-1"><strong className="gradient-text">Kapasitas Angkut:</strong> {data.kapasitasAngkut}</p>
                                    </div>

                                    <div className="border p-3 mb-3">
                                        <h5 className="card-title gradient-text fw-bold">Biaya dan Efisiensi</h5>
                                        <p className="mb-1"><strong className="gradient-text">Biaya Transportasi:</strong> {data.biayaTransportasi}</p>
                                        <p className="mb-1"><strong className="gradient-text">Catatan Efisiensi Rute:</strong> {data.catatanEfisiensiRute}</p>
                                    </div>

                                    <div className="border p-3 mb-3">
                                        <h5 className="card-title gradient-text fw-bold">Feedback</h5>
                                        <p className="mb-1"><strong className="gradient-text">Kondisi Pengiriman:</strong> {data.kondisiPengiriman}</p>
                                        <p className="mb-1"><strong className="gradient-text">Catatan Dari Penerima:</strong> {data.catatanDariPenerima}</p>
                                    </div>
                                </div>
                                {user && userAuth?.role === "admin" && (
                                    <div className="d-flex justify-content-end">
                                        <Link to={`/data-logistik/edit/${data.id}`} className="btn btn-info btn-sm mr-2">
                                            Edit
                                        </Link>
                                        <button onClick={() => deleteProduct(data.id)} className="btn btn-danger btn-sm">
                                            Hapus
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>Memuat data...</p>
        )}
    </div>
</Layout>
</>
    );
};

export default ListDataLogistik;
