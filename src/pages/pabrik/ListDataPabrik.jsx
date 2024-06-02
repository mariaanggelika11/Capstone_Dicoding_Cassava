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
        <Layout>
            <div>
                <h1 className="title">Data Pabrik</h1>
                <Link to="/data-pabrik/add" className="button is-primary mb-2">
                    Tambah Data Baru
                </Link>
                {dataPabrik.length > 0 ? (
                    dataPabrik.map(pabrik => (
                        <div key={pabrik.id} className="card px-6 my-6">
                            {user && (user.role === "admin") && (
                                <div>
                                    <h1 className=" is-size-3 has-text-weight-bold">Nama Petani: {pabrik.user.name}</h1>
                                    <h1 className=" is-size-3 has-text-weight-bold">Email Petani: {pabrik.user.email}</h1>
                                </div>
                            )}
                            <div>
                                <p><strong>ID Pengiriman:</strong> {pabrik.idPengiriman}</p>
                                <p><strong>Tanggal Penerimaan:</strong> {pabrik.tanggalPenerimaan}</p>
                                <p><strong>Berat Total Diterima:</strong> {pabrik.beratTotalDiterima} kg</p>
                                <p><strong>Evaluasi Kualitas:</strong> {pabrik.evaluasiKualitas}</p>
                                <p><strong>Catatan Kualitas:</strong> {pabrik.catatanKualitas}</p>
                                <p><strong>Kapasitas Produksi:</strong> {pabrik.kapasitasProduksi} kg</p>
                                <p><strong>Produksi Harian Tapioka:</strong> {pabrik.produksiHarianTapioka} kg</p>
                                <p><strong>Kualitas Output:</strong> {pabrik.kualitasOutput}</p>
                                <p><strong>Permasalahan Operasional:</strong> {pabrik.permasalahanOperasional}</p>
                                <p><strong>Kebutuhan Perbaikan:</strong> {pabrik.kebutuhanPerbaikan}</p>
                            </div>
                            {user && (user.role === "admin") && (
                                <div className="buttons">
                                    <Link to={`/data-pabrik/edit/${pabrik.id}`} className="button is-info is-small">Edit</Link>
                                    <button onClick={() => deleteDataPabrik(pabrik.id)} className="button is-danger is-small">Hapus</button>
                                </div>
                            )}

                        </div>
                    ))
                ) : (
                    <p>Memuat data...</p>
                )}
            </div>
        </Layout>
    );
};

export default ListDataPabrik;
