import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const FormTerimaOrder = () => {
  const { user } = useSelector((state) => state.auth);

  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [noHpPerusahaan, setNoHpPerusahaan] = useState("");
  const [statusOrder, setStatusOrder] = useState("");
  const [namaLogistik, setNamaLogistik] = useState("");
  const [noHpLogistik, setNoHpLogistik] = useState("");
  const [platnoLogistik, setPlatnoLogistik] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`https://c-greenproject.org:8000/products/${id}`);
        setNamaPerusahaan(response.data.namaPerusahaan);
        setNoHpPerusahaan(response.data.noHpPerusahaan);
        setStatusOrder(response.data.statusOrder);
        setNamaLogistik(response.data.namaLogistik);
        setNoHpLogistik(response.data.noHpLogistik);
        setPlatnoLogistik(response.data.platnoLogistik);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://c-greenproject.org:8000/products/${id}`, {
        namaPerusahaan: namaPerusahaan,
        noHpPerusahaan: noHpPerusahaan,
        statusOrder: statusOrder,
        namaLogistik: namaLogistik,
        noHpLogistik: noHpLogistik,
        platnoLogistik: platnoLogistik,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
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


    <div className="container">
      <h2 className="subtitle gradient-text">Terima Orderan</h2>
          <form onSubmit={updateProduct}>
            <div className="content">
              <p className="text-center">{msg}</p>
              {user && (user.role === "pabrik" || user.role === "admin") && (
                <div>
                  <div className="mb-3">
                    <label className="form-label">Nama Pabrik</label>
                    <input
                      type="text"
                      className="form-control"
                      value={namaPerusahaan}
                      onChange={(e) => setNamaPerusahaan(e.target.value)}
                      placeholder="Nama Pabrik"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nomor HP</label>
                    <input
                      type="text"
                      className="form-control"
                      value={noHpPerusahaan}
                      onChange={(e) => setNoHpPerusahaan(e.target.value)}
                      placeholder="Nomor HP Pabrik"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status Order:</label>
                    <select
                      className="form-select"
                      value={statusOrder}
                      onChange={(e) => setStatusOrder(e.target.value)}
                      required
                    >
                      <option value="disetujui">Disetujui</option>
                      <option value="ditolak">Ditolak</option>
                    </select>
                  </div>
                </div>
              )}

              {user && (user.role === "admin" || user.role === "logistik") && (
                <div>
                  <div className="mb-3">
                    <label className="form-label">Nama Logistik</label>
                    <input
                      type="text"
                      className="form-control"
                      value={namaLogistik}
                      onChange={(e) => setNamaLogistik(e.target.value)}
                      placeholder="Nama Logistik"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nomor HP Logistik</label>
                    <input
                      type="text"
                      className="form-control"
                      value={noHpLogistik}
                      onChange={(e) => setNoHpLogistik(e.target.value)}
                      placeholder="Nomor HP Logistik"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Plat Nomor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={platnoLogistik}
                      onChange={(e) => setPlatnoLogistik(e.target.value)}
                      placeholder="Plat Nomor Logistik"
                    />
                  </div>
                </div>
              )}

              <div className="mb-3">
                <div className="btn-group">
                    <button type="submit" className="btn btn-success mt-3">Update</button>
                    <NavLink to='/products' className='btn btn-info mt-3'>Back</NavLink>
                </div>
              </div>
            </div>
          </form>
    </div>
</>
  );
};

export default FormTerimaOrder;
