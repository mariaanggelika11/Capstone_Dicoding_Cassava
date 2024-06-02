import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const ListDataLogistikEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isError, user } = useSelector((state) => state.auth);

    // States untuk setiap field data logistik
    const [tanggalWaktuPengiriman, setTanggalWaktuPengiriman] = useState("");
    const [asal, setAsal] = useState("");
    const [tujuan, setTujuan] = useState("");
    const [estimasiWaktuTiba, setEstimasiWaktuTiba] = useState("");
    const [nomorPolisiKendaraan, setNomorPolisiKendaraan] = useState("");
    const [jenisKendaraan, setJenisKendaraan] = useState("");
    const [kapasitasAngkut, setKapasitasAngkut] = useState("");
    const [biayaTransportasi, setBiayaTransportasi] = useState("");
    const [catatanEfisiensiRute, setCatatanEfisiensiRute] = useState("");
    const [kondisiPengiriman, setKondisiPengiriman] = useState("");
    const [catatanDariPenerima, setCatatanDariPenerima] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchLogistikData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/logistik/${id}`);
                const data = response.data;
                setTanggalWaktuPengiriman(data.tanggalWaktuPengiriman.split(".")[0]);
                setAsal(data.asal);
                setTujuan(data.tujuan);
                setEstimasiWaktuTiba(data.estimasiWaktuTiba.split(".")[0]);
                setNomorPolisiKendaraan(data.nomorPolisiKendaraan);
                setJenisKendaraan(data.jenisKendaraan);
                setKapasitasAngkut(data.kapasitasAngkut.toString());
                setBiayaTransportasi(data.biayaTransportasi.toString());
                setCatatanEfisiensiRute(data.catatanEfisiensiRute);
                setKondisiPengiriman(data.kondisiPengiriman);
                setCatatanDariPenerima(data.catatanDariPenerima);
            } catch (error) {
                setMsg(error?.response?.data?.msg || "Terjadi kesalahan saat mengambil data");
            }
        };

        fetchLogistikData();
    }, [id]);

    const updateLogistikData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/logistik/${id}`, {
                tanggalWaktuPengiriman,
                asal,
                tujuan,
                estimasiWaktuTiba,
                nomorPolisiKendaraan,
                jenisKendaraan,
                kapasitasAngkut: Number(kapasitasAngkut),
                biayaTransportasi: Number(biayaTransportasi),
                catatanEfisiensiRute,
                kondisiPengiriman,
                catatanDariPenerima,
            });
            navigate("/data-logistik"); // Sesuaikan sesuai dengan route yang diinginkan
        } catch (error) {
            setMsg(error?.response?.data?.msg || "Terjadi kesalahan saat memperbarui data");
        }
    };

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && (user.role !== "admin" && user.role !== "logistik")) {
            navigate("/dashboard");
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <h1 className="title">Edit Data Logistik</h1>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateLogistikData}>
                            <p className="has-text-centered">{msg}</p>

                            {/* Here goes the form fields */}
                            {/* Repeat the pattern for each field */}
                            <div className="field">
                                <label className="label">Tanggal Waktu Pengiriman</label>
                                <div className="control">
                                    <input
                                        type="datetime-local"
                                        className="input"
                                        value={tanggalWaktuPengiriman}
                                        onChange={(e) => setTanggalWaktuPengiriman(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Asal</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={asal}
                                        onChange={(e) => setAsal(e.target.value)}
                                        placeholder="Asal"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Tujuan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={tujuan}
                                        onChange={(e) => setTujuan(e.target.value)}
                                        placeholder="Tujuan"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Estimasi Waktu Tiba</label>
                                <div className="control">
                                    <input
                                        type="datetime-local"
                                        className="input"
                                        value={estimasiWaktuTiba}
                                        onChange={(e) => setEstimasiWaktuTiba(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Nomor Polisi Kendaraan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={nomorPolisiKendaraan}
                                        onChange={(e) => setNomorPolisiKendaraan(e.target.value)}
                                        placeholder="Nomor Polisi Kendaraan"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Jenis Kendaraan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jenisKendaraan}
                                        onChange={(e) => setJenisKendaraan(e.target.value)}
                                        placeholder="Jenis Kendaraan"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Kapasitas Angkut (kg)</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={kapasitasAngkut}
                                        onChange={(e) => setKapasitasAngkut(e.target.value)}
                                        placeholder="Kapasitas Angkut"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Biaya Transportasi (Rp)</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={biayaTransportasi}
                                        onChange={(e) => setBiayaTransportasi(e.target.value)}
                                        placeholder="Biaya Transportasi"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Catatan Efisiensi Rute</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={catatanEfisiensiRute}
                                        onChange={(e) => setCatatanEfisiensiRute(e.target.value)}
                                        placeholder="Catatan Efisiensi Rute"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Kondisi Pengiriman</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={kondisiPengiriman}
                                        onChange={(e) => setKondisiPengiriman(e.target.value)}
                                        placeholder="Kondisi Pengiriman"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Catatan Dari Penerima</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={catatanDariPenerima}
                                        onChange={(e) => setCatatanDariPenerima(e.target.value)}
                                        placeholder="Catatan Dari Penerima"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ListDataLogistikEdit;
