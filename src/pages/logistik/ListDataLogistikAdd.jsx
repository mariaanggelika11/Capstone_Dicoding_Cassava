import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const ListDataLogistikAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    // States for each field in the logistik data form
    const [tanggalWaktuPengiriman, setTanggalWaktuPengiriman] = useState("");
    const [asal, setAsal] = useState("");
    const [tujuan, setTujuan] = useState("");
    const [estimasiWaktuTiba, setEstimasiWaktuTiba] = useState("");
    const [nomorPolisiKendaraan, setNomorPolisiKendaraan] = useState("");
    const [jenisKendaraan, setJenisKendaraan] = useState("");
    const [kapasitasAngkut, setKapasitasAngkut] = useState(0);
    const [biayaTransportasi, setBiayaTransportasi] = useState(0);
    const [catatanEfisiensiRute, setCatatanEfisiensiRute] = useState("");
    const [kondisiPengiriman, setKondisiPengiriman] = useState("");
    const [catatanDariPenerima, setCatatanDariPenerima] = useState("");
    const [msg, setMsg] = useState("");

    const saveLogistik = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://c-greenproject.org:8000/logistik", {
                tanggalWaktuPengiriman,
                asal,
                tujuan,
                estimasiWaktuTiba,
                nomorPolisiKendaraan,
                jenisKendaraan,
                kapasitasAngkut,
                biayaTransportasi,
                catatanEfisiensiRute,
                kondisiPengiriman,
                catatanDariPenerima,
            });
            navigate("/data-logistik"); // Adjust this as needed
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
        if (user && (user.role !== "admin" && user.role !== "logistik")) {
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
    <h4 className="gradient-text fw-bold">Tambah Data Logistik</h4>
    <div className="card shadow mb-3">
        <div className="card-body">
            <form onSubmit={saveLogistik}>
                <p className="text-center">{msg}</p>

                {/* Form fields */}
                <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Tanggal Waktu Pengiriman</label>
                    <div className="col-md-9">
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={tanggalWaktuPengiriman}
                            onChange={(e) => setTanggalWaktuPengiriman(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Asal</label>
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            value={asal}
                            onChange={(e) => setAsal(e.target.value)}
                            placeholder="Asal"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Tujuan</label>
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            value={tujuan}
                            onChange={(e) => setTujuan(e.target.value)}
                            placeholder="Tujuan"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Estimasi Waktu Tiba</label>
                    <div className="col-md-9">
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={estimasiWaktuTiba}
                            onChange={(e) => setEstimasiWaktuTiba(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Nomor Polisi Kendaraan</label>
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            value={nomorPolisiKendaraan}
                            onChange={(e) => setNomorPolisiKendaraan(e.target.value)}
                            placeholder="Nomor Polisi Kendaraan"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Jenis Kendaraan</label>
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            value={jenisKendaraan}
                            onChange={(e) => setJenisKendaraan(e.target.value)}
                            placeholder="Jenis Kendaraan"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Kapasitas Angkut (kg)</label>
                    <div className="col-md-9">
                        <input
                            type="number"
                            className="form-control"
                            value={kapasitasAngkut}
                            onChange={(e) => setKapasitasAngkut(e.target.value)}
                            placeholder="Kapasitas Angkut"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Biaya Transportasi (Rp)</label>
                    <div className="col-md-9">
                        <input
                            type="number"
                            className="form-control"
                            value={biayaTransportasi}
                            onChange={(e) => setBiayaTransportasi(e.target.value)}
                            placeholder="Biaya Transportasi"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Catatan Efisiensi Rute</label>
                    <textarea
                        className="form-control"
                        value={catatanEfisiensiRute}
                        onChange={(e) => setCatatanEfisiensiRute(e.target.value)}
                        placeholder="Catatan Efisiensi Rute"
                    ></textarea>
                </div>

                <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Kondisi Pengiriman</label>
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            value={kondisiPengiriman}
                            onChange={(e) => setKondisiPengiriman(e.target.value)}
                            placeholder="Kondisi Pengiriman"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Catatan Dari Penerima</label>
                    <textarea
                        className="form-control"
                        value={catatanDariPenerima}
                        onChange={(e) => setCatatanDariPenerima(e.target.value)}
                        placeholder="Catatan Dari Penerima"
                    ></textarea>
                </div>

                <div className="btn-group">
                    <button type="submit" className="btn btn-success btn-sm">
                        Simpan
                    </button>
                <Link to={'/data-logistik'} className="btn btn-info btn-sm">Kembali</Link>
                </div>
            </form>
        </div>
    </div>

</Layout>
</>
    );
};

export default ListDataLogistikAdd;
