import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const EditDataLahan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Mendapatkan ID dari URL
    const { isError, user } = useSelector((state) => state.auth);

    // States untuk setiap field
    const [lokasilahan, setLokasiLahan] = useState("");
    const [luaslahan, setLuasLahan] = useState("");
    const [statuskepemilikanlahan, setStatusKepemilikanLahan] = useState("");
    const [periodeTanamMulai, setPeriodeTanamMulai] = useState("");
    const [periodeTanamSelesai, setPeriodeTanamSelesai] = useState("");
    const [varietassingkong, setVarietasSingkong] = useState("");
    const [estimasiproduksi, setEstimasiProduksi] = useState("");
    const [produksiaktual, setProduksiAktual] = useState("");
    const [jenispupuk, setJenisPupuk] = useState("");
    const [jumlahpupuk, setJumlahPupuk] = useState("");
    const [hargajual, setHargaJual] = useState("");
    const [totalpendapatan, setTotalPendapatan] = useState("");
    const [pendapatanbersih, setPendapatanBersih] = useState("");
    const [catatantambahan, setCatatanTambahan] = useState("");
    const [msg, setMsg] = useState("");

    // Fungsi untuk mengambil data lahan dari server
    useEffect(() => {
        const fetchDataLahan = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/petani/${id}`);
                const data = response.data;
                setLokasiLahan(data.lokasilahan);
                setLuasLahan(data.luaslahan);
                setStatusKepemilikanLahan(data.statuskepemilikanlahan);
                setPeriodeTanamMulai(data.periodeTanamMulai);
                setPeriodeTanamSelesai(data.periodeTanamSelesai);
                setVarietasSingkong(data.varietassingkong);
                setEstimasiProduksi(data.estimasiproduksi);
                setProduksiAktual(data.produksiaktual);
                setJenisPupuk(data.jenispupuk);
                setJumlahPupuk(data.jumlahpupuk);
                setHargaJual(data.hargajual);
                setTotalPendapatan(data.totalpendapatan);
                setPendapatanBersih(data.pendapatanbersih);
                setCatatanTambahan(data.catatantambahan);
            } catch (error) {
                setMsg(error?.response?.data?.msg || "Terjadi kesalahan saat mengambil data");
            }
        };

        fetchDataLahan();
    }, [id]);

    // Fungsi untuk menyimpan perubahan data ke server
    const updateDataLahan = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/petani/${id}`, {
                lokasilahan,
                luaslahan,
                statuskepemilikanlahan,
                periodeTanamMulai,
                periodeTanamSelesai,
                varietassingkong,
                estimasiproduksi,
                produksiaktual,
                jenispupuk,
                jumlahpupuk,
                hargajual,
                totalpendapatan,
                pendapatanbersih,
                catatantambahan,
            });
            navigate("/datalahan");
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
        if (user && (user.role !== "admin" && user.role !== "petani")) {
            navigate("/dashboard");
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <h1 className="title">Edit Data Lahan</h1>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateDataLahan}>
                            <p className="has-text-centered">{msg}</p>
                            {/* Lokasi Lahan */}
                            <div className="field">
                                <label className="label">Lokasi Lahan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={lokasilahan}
                                        onChange={(e) => setLokasiLahan(e.target.value)}
                                        placeholder="Lokasi Lahan"
                                    />
                                </div>
                            </div>
                            {/* Luas Lahan */}
                            <div className="field">
                                <label className="label">Luas Lahan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={luaslahan}
                                        onChange={(e) => setLuasLahan(e.target.value)}
                                        placeholder="Luas Lahan"
                                    />
                                </div>
                            </div>
                            {/* Status Kepemilikan Lahan */}
                            <div className="field">
                                <label className="label">Status Kepemilikan Lahan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={statuskepemilikanlahan}
                                        onChange={(e) => setStatusKepemilikanLahan(e.target.value)}
                                        placeholder="Status Kepemilikan Lahan"
                                    />
                                </div>
                            </div>
                            {/* Periode Tanam Mulai */}
                            <div className="field">
                                <label className="label">Periode Tanam Mulai</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        value={periodeTanamMulai}
                                        onChange={(e) => setPeriodeTanamMulai(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Periode Tanam Selesai */}
                            <div className="field">
                                <label className="label">Periode Tanam Selesai</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        value={periodeTanamSelesai}
                                        onChange={(e) => setPeriodeTanamSelesai(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Varietas/Jenis Singkong */}
                            <div className="field">
                                <label className="label">Varietas/Jenis Singkong</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={varietassingkong}
                                        onChange={(e) => setVarietasSingkong(e.target.value)}
                                        placeholder="Varietas Singkong"
                                    />
                                </div>
                            </div>
                            {/* Estimasi Produksi */}
                            <div className="field">
                                <label className="label">Estimasi Produksi</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={estimasiproduksi}
                                        onChange={(e) => setEstimasiProduksi(e.target.value)}
                                        placeholder="Estimasi Produksi"
                                    />
                                </div>
                            </div>
                            {/* Produksi Aktual */}
                            <div className="field">
                                <label className="label">Produksi Aktual</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={produksiaktual}
                                        onChange={(e) => setProduksiAktual(e.target.value)}
                                        placeholder="Produksi Aktual"
                                    />
                                </div>
                            </div>
                            {/* Jenis Pupuk */}
                            <div className="field">
                                <label className="label">Jenis Pupuk</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jenispupuk}
                                        onChange={(e) => setJenisPupuk(e.target.value)}
                                        placeholder="Jenis Pupuk"
                                    />
                                </div>
                            </div>
                            {/* Jumlah Pupuk */}
                            <div className="field">
                                <label className="label">Jumlah Pupuk</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={jumlahpupuk}
                                        onChange={(e) => setJumlahPupuk(e.target.value)}
                                        placeholder="Jumlah Pupuk"
                                    />
                                </div>
                            </div>
                            {/* Harga Jual */}
                            <div className="field">
                                <label className="label">Harga Jual</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={hargajual}
                                        onChange={(e) => setHargaJual(e.target.value)}
                                        placeholder="Harga Jual"
                                    />
                                </div>
                            </div>
                            {/* Total Pendapatan */}
                            <div className="field">
                                <label className="label">Total Pendapatan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={totalpendapatan}
                                        onChange={(e) => setTotalPendapatan(e.target.value)}
                                        placeholder="Total Pendapatan"
                                    />
                                </div>
                            </div>
                            {/* Pendapatan Bersih */}
                            <div className="field">
                                <label className="label">Pendapatan Bersih</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={pendapatanbersih}
                                        onChange={(e) => setPendapatanBersih(e.target.value)}
                                        placeholder="Pendapatan Bersih"
                                    />
                                </div>
                            </div>
                            {/* Catatan Tambahan */}
                            <div className="field">
                                <label className="label">Catatan Tambahan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={catatantambahan}
                                        onChange={(e) => setCatatanTambahan(e.target.value)}
                                        placeholder="Catatan Tambahan"
                                    />
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

export default EditDataLahan;
