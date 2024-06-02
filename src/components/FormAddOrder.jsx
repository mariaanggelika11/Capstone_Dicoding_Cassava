import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [tanggalPemanenan, setTanggalPemanenan] = useState("");
  const [varietasSingkong, setVarietasSingkong] = useState("");
  const [estimasiBerat, setEstimasiBerat] = useState("");
  const [estimasiHarga, setEstimasiHarga] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", {
        tanggalPemanenan: tanggalPemanenan,
        varietasSingkong: varietasSingkong,
        estimasiBerat: estimasiBerat,
        estimasiHarga: estimasiHarga,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Order Pemanenan</h1>
      <h2 className="subtitle">Add New Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Tanggal Panen</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={tanggalPemanenan}
                    onChange={(e) => setTanggalPemanenan(e.target.value)}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">varietas/Jenis Singkong</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={varietasSingkong}
                    onChange={(e) => setVarietasSingkong(e.target.value)}
                    placeholder="Varietas"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Estimasi Berat (kg) </label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={estimasiBerat}
                    onChange={(e) => setEstimasiBerat(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>\
              <div className="field">
                <label className="label">Harga per kg (Rp) </label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={estimasiHarga}
                    onChange={(e) => setEstimasiHarga(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
