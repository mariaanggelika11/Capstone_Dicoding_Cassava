import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";

const ListdataPabrikAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    // Initialize state for each field in the pabrik data form
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

    const savePabrik = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/pabrik", {
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
            navigate("/data-pabrik"); // Adjust this as needed based on your routing
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
        // Adjust this condition based on your application's needs
        if (user && (user.role !== "admin" && user.role !== "pabrik")) {
            navigate("/dashboard");
        }

    }, [isError, user, navigate]);

    return (
        <Layout>
            <h1 className="title">Tambah Data Pabrik</h1>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={savePabrik}>
                            <p className="has-text-centered">{msg}</p>

                            {/* Form fields for each property */}
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
                                        placeholder="Berat Total Diterima"
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
                                        placeholder="Evaluasi Kualitas"
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
                                        placeholder="Catatan Kualitas"
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
                                        placeholder="Kapasitas Produksi"
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
                                        placeholder="Produksi Harian Tapioka"
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
                                        placeholder="Kualitas Output"
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
                                        placeholder="Permasalahan Operasional"
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
                                        placeholder="Kebutuhan Perbaikan"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Simpan
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

export default ListdataPabrikAdd;
