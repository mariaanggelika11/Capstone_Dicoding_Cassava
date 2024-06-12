import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const ListDataPabrik = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
    const [dataPabrik, setDataPabrik] = useState([]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        const fetchDataPabrik = async () => {
            try {
                const response = await axios.get("http://localhost:5000/pabrik");
                setDataPabrik(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataPabrik();
    }, []);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && user.role !== "pabrik" && user.role !== "admin") {
            navigate("/");
        }
    }, [isError, user, navigate]);

    const deleteDataPabrik = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`http://localhost:5000/pabrik/${id}`);
                const updatedDataPabrik = dataPabrik.filter(item => item.id !== id);
                setDataPabrik(updatedDataPabrik);
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
        <h1 className="gradient-text fw-bold">Data Pabrik</h1>
        <Link to="/data-pabrik/add" className="btn btn-primary btn-sm mb-3">
            Tambah Data Baru
        </Link>
        {dataPabrik.length > 0 ? (
            <div className="row">
                {dataPabrik.map(pabrik => (
                    <div key={pabrik.id} className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body p-3">
                                {user && user.role === "admin" && (
                                    <div className="mb-2">
                                        <h5 className="card-title gradient-text mb-1">Nama Petani: {pabrik.user.name}</h5>
                                        <h5 className="card-title gradient-text mb-1">Email Petani: {pabrik.user.email}</h5>
                                    </div>
                                )}
                                <div className="mb-2" style={{ fontSize: "14px" }}>
                                    <p className="mb-1"><strong className="gradient-text">ID Pengiriman:</strong> {pabrik.idPengiriman}</p>
                                    <p className="mb-1"><strong className="gradient-text">Tanggal Penerimaan:</strong> {pabrik.tanggalPenerimaan}</p>
                                    <p className="mb-1"><strong className="gradient-text">Berat Total Diterima:</strong> {pabrik.beratTotalDiterima} kg</p>
                                    <p className="mb-1"><strong className="gradient-text">Evaluasi Kualitas:</strong> {pabrik.evaluasiKualitas}</p>
                                    <p className="mb-1"><strong className="gradient-text">Catatan Kualitas:</strong> {pabrik.catatanKualitas}</p>
                                    <p className="mb-1"><strong className="gradient-text">Kapasitas Produksi:</strong> {pabrik.kapasitasProduksi} kg</p>
                                    <p className="mb-1"><strong className="gradient-text">Produksi Harian Tapioka:</strong> {pabrik.produksiHarianTapioka} kg</p>
                                    <p className="mb-1"><strong className="gradient-text">Kualitas Output:</strong> {pabrik.kualitasOutput}</p>
                                    <p className="mb-1"><strong className="gradient-text">Permasalahan Operasional:</strong> {pabrik.permasalahanOperasional}</p>
                                    <p className="mb-1"><strong className="gradient-text">Kebutuhan Perbaikan:</strong> {pabrik.kebutuhanPerbaikan}</p>
                                </div>
                                {user && user.role === "admin" && (
                                    <div className="justify-content-end d-flex">
                                        <Link to={`/data-pabrik/edit/${pabrik.id}`} className="btn btn-info btn-sm mr-3">Edit</Link>
                                        <button onClick={() => deleteDataPabrik(pabrik.id)} className="btn btn-danger btn-sm">Hapus</button>
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

export default ListDataPabrik;
