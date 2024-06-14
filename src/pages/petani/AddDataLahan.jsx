import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";


const AddDataLahan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    // States for each field
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

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://c-greenproject.org:8000/petani", {
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
            if (error.response) {
                setMsg(error.response.data.msg);
            }
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
<>
<style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>
<Layout>
    <h3 className="gradient-text fw-bold">Tambah Data Lahan</h3>
    <div className="card shadow-sm mb-3" style={{ fontSize: "14px" }}>
        <div className="card-body">
            <div className="content">
                <form onSubmit={saveProduct}>
                    <p className="text-center text-danger">{msg}</p>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Lokasi Lahan</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lokasilahan}
                                onChange={(e) => setLokasiLahan(e.target.value)}
                                placeholder="Lokasi Lahan"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Luas Lahan</label>
                            <input
                                type="text"
                                className="form-control"
                                value={luaslahan}
                                onChange={(e) => setLuasLahan(e.target.value)}
                                placeholder="Luas Lahan"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Status Kepemilikan Lahan</label>
                            <input
                                type="text"
                                className="form-control"
                                value={statuskepemilikanlahan}
                                onChange={(e) => setStatusKepemilikanLahan(e.target.value)}
                                placeholder="Status Kepemilikan Lahan"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Periode Tanam Mulai</label>
                            <input
                                type="date"
                                className="form-control"
                                value={periodeTanamMulai}
                                onChange={(e) => setPeriodeTanamMulai(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Periode Tanam Selesai</label>
                            <input
                                type="date"
                                className="form-control"
                                value={periodeTanamSelesai}
                                onChange={(e) => setPeriodeTanamSelesai(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Varietas/Jenis Singkong</label>
                            <input
                                type="text"
                                className="form-control"
                                value={varietassingkong}
                                onChange={(e) => setVarietasSingkong(e.target.value)}
                                placeholder="Varietas Singkong"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Estimasi Produksi</label>
                            <input
                                type="text"
                                className="form-control"
                                value={estimasiproduksi}
                                onChange={(e) => setEstimasiProduksi(e.target.value)}
                                placeholder="Estimasi Produksi"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Produksi Aktual</label>
                            <input
                                type="text"
                                className="form-control"
                                value={produksiaktual}
                                onChange={(e) => setProduksiAktual(e.target.value)}
                                placeholder="Produksi Aktual"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Jenis Pupuk</label>
                            <input
                                type="text"
                                className="form-control"
                                value={jenispupuk}
                                onChange={(e) => setJenisPupuk(e.target.value)}
                                placeholder="Jenis pupuk yang digunakan"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Jumlah Pupuk</label>
                            <input
                                type="text"
                                className="form-control"
                                value={jumlahpupuk}
                                onChange={(e) => setJumlahPupuk(e.target.value)}
                                placeholder="Jumlah pupuk yang digunakan"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Harga Jual</label>
                            <input
                                type="text"
                                className="form-control"
                                value={hargajual}
                                onChange={(e) => setHargaJual(e.target.value)}
                                placeholder="Harga Jual"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Total Pendapatan</label>
                            <input
                                type="text"
                                className="form-control"
                                value={totalpendapatan}
                                onChange={(e) => setTotalPendapatan(e.target.value)}
                                placeholder="Total Pendapatan"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Pendapatan Bersih</label>
                            <input
                                type="text"
                                className="form-control"
                                value={pendapatanbersih}
                                onChange={(e) => setPendapatanBersih(e.target.value)}
                                placeholder="Pendapatan Bersih"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Catatan Tambahan</label>
                            <input
                                type="text"
                                className="form-control"
                                value={catatantambahan}
                                onChange={(e) => setCatatanTambahan(e.target.value)}
                                placeholder="Catatan Tambahan"
                            />
                        </div>

                        <div className="btn-group col-2">
                            <button type="submit" className="btn btn-success btn-sm">Simpan</button>
                            <Link to={'/datalahan'} className="btn btn-info btn-sm">Kembali</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</Layout>
</>
    );
};

export default AddDataLahan;
