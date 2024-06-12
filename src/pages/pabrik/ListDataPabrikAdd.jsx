import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";
import { NavLink } from "react-router-dom";

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
<>
<style jsx>{`
      body{
        padding-top: 80px;
      }
`}</style>

<Layout>
            <h4 className="gradient-text fw-bold">Tambah Data Pabrik</h4>
            <div className="card shadow-sm mb-4" style={{ fontSize: "14px" }}>
                <div className="card-body">
                    <form onSubmit={savePabrik}>
                        <p className="text-center text-danger">{msg}</p>

                        {/* Form fields for each property */}
                        <div className="mb-3">
                            <label className="form-label">Tanggal Penerimaan</label>
                            <input
                                type="date"
                                className="form-control"
                                value={tanggalPenerimaan}
                                onChange={(e) => setTanggalPenerimaan(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Berat Total Diterima</label>
                            <input
                                type="number"
                                className="form-control"
                                value={beratTotalDiterima}
                                onChange={(e) => setBeratTotalDiterima(e.target.value)}
                                placeholder="Berat Total Diterima"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Evaluasi Kualitas</label>
                            <input
                                type="text"
                                className="form-control"
                                value={evaluasiKualitas}
                                onChange={(e) => setEvaluasiKualitas(e.target.value)}
                                placeholder="Evaluasi Kualitas"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Catatan Kualitas</label>
                            <textarea
                                className="form-control"
                                value={catatanKualitas}
                                onChange={(e) => setCatatanKualitas(e.target.value)}
                                placeholder="Catatan Kualitas"
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Kapasitas Produksi</label>
                            <input
                                type="number"
                                className="form-control"
                                value={kapasitasProduksi}
                                onChange={(e) => setKapasitasProduksi(e.target.value)}
                                placeholder="Kapasitas Produksi"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Produksi Harian Tapioka</label>
                            <input
                                type="number"
                                className="form-control"
                                value={produksiHarianTapioka}
                                onChange={(e) => setProduksiHarianTapioka(e.target.value)}
                                placeholder="Produksi Harian Tapioka"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Kualitas Output</label>
                            <input
                                type="text"
                                className="form-control"
                                value={kualitasOutput}
                                onChange={(e) => setKualitasOutput(e.target.value)}
                                placeholder="Kualitas Output"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Permasalahan Operasional</label>
                            <input
                                type="text"
                                className="form-control"
                                value={permasalahanOperasional}
                                onChange={(e) => setPermasalahanOperasional(e.target.value)}
                                placeholder="Permasalahan Operasional"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Kebutuhan Perbaikan</label>
                            <input
                                type="text"
                                className="form-control"
                                value={kebutuhanPerbaikan}
                                onChange={(e) => setKebutuhanPerbaikan(e.target.value)}
                                placeholder="Kebutuhan Perbaikan"
                            />
                        </div>
                        <div className="btn-group">
                            <button type="submit" className="btn btn-sm btn-success">
                                Simpan
                            </button>
                            <NavLink to='/data-pabrik' className='btn btn-sm btn-info'>Kembali</NavLink>
                        </div>
                    </form>
            </div>
        </div>
</Layout>
</>
    );
};

export default ListdataPabrikAdd;
