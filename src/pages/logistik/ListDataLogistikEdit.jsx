import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
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
                const response = await axios.get(`https://c-greenproject.org:8000/logistik/${id}`);
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
            await axios.put(`https://c-greenproject.org:8000/logistik/${id}`, {
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
<>
<style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>

<Layout>
    <h4 className="gradient-text fw-bold">Edit Data Logistik</h4>
    <div className="card shadow mb-3">
        <div className="card-body">
            <form onSubmit={updateLogistikData}>
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
                        Update
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

export default ListDataLogistikEdit;
