import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const ListDataPabrikEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isError, user } = useSelector((state) => state.auth);

    const [tanggalPenerimaan, setTanggalPenerimaan] = useState("");
    const [beratTotalDiterima, setBeratTotalDiterima] = useState("");
    const [evaluasiKualitas, setEvaluasiKualitas] = useState("");
    const [catatanKualitas, setCatatanKualitas] = useState("");
    const [kapasitasProduksi, setKapasitasProduksi] = useState("");
    const [produksiHarianTapioka, setProduksiHarianTapioka] = useState("");
    const [kualitasOutput, setKualitasOutput] = useState("");
    const [permasalahanOperasional, setPermasalahanOperasional] = useState("");
    const [kebutuhanPerbaikan, setKebutuhanPerbaikan] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchPabrikData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/pabrik/${id}`);
                const data = response.data;
                setTanggalPenerimaan(data.tanggalPenerimaan);
                setBeratTotalDiterima(data.beratTotalDiterima.toString());
                setEvaluasiKualitas(data.evaluasiKualitas);
                setCatatanKualitas(data.catatanKualitas);
                setKapasitasProduksi(data.kapasitasProduksi.toString());
                setProduksiHarianTapioka(data.produksiHarianTapioka.toString());
                setKualitasOutput(data.kualitasOutput);
                setPermasalahanOperasional(data.permasalahanOperasional);
                setKebutuhanPerbaikan(data.kebutuhanPerbaikan);
            } catch (error) {
                setMsg(error?.response?.data?.msg || "Terjadi kesalahan saat mengambil data");
            }
        };

        fetchPabrikData();
    }, [id]);

    const updatePabrikData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/pabrik/${id}`, {
                tanggalPenerimaan,
                beratTotalDiterima: parseInt(beratTotalDiterima),
                evaluasiKualitas,
                catatanKualitas,
                kapasitasProduksi: parseInt(kapasitasProduksi),
                produksiHarianTapioka: parseInt(produksiHarianTapioka),
                kualitasOutput,
                permasalahanOperasional,
                kebutuhanPerbaikan,
            });
            navigate("/data-pabrik");
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
        if (user && (user.role !== "admin" && user.role !== "pabrik")) {
            navigate("/dashboard");
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <h1 className="title">Edit Data Pabrik</h1>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updatePabrikData}>
                            <p className="has-text-centered">{msg}</p>
                            {/* Repeat this pattern for each field */}
                            <div className="field">
                                <label className="label">Tanggal Penerimaan</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        value={tanggalPenerimaan}
                                        onChange={(e) => setTanggalPenerimaan(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Berat Total Diterima</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={beratTotalDiterima}
                                        onChange={(e) => setBeratTotalDiterima(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Evaluasi Kualitas</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={evaluasiKualitas}
                                        onChange={(e) => setEvaluasiKualitas(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Catatan Kualitas</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={catatanKualitas}
                                        onChange={(e) => setCatatanKualitas(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Kapasitas Produksi</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={kapasitasProduksi}
                                        onChange={(e) => setKapasitasProduksi(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Produksi Harian Tapioka</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={produksiHarianTapioka}
                                        onChange={(e) => setProduksiHarianTapioka(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Kualitas Output</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={kualitasOutput}
                                        onChange={(e) => setKualitasOutput(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Permasalahan Operasional</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={permasalahanOperasional}
                                        onChange={(e) => setPermasalahanOperasional(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Kebutuhan Perbaikan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={kebutuhanPerbaikan}
                                        onChange={(e) => setKebutuhanPerbaikan(e.target.value)}
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

export default ListDataPabrikEdit;
