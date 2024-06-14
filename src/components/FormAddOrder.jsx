import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
      await axios.post("https://c-greenproject.org:8000/products", {
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
<>
      <style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>


    <div className="container">
      <h2 className="subtitle gradient-text">Add New Product</h2>

          <form onSubmit={saveProduct}>
            <div className="content">
              <p className="text-center">{msg}</p>
              <div className="mb-3">
                <label htmlFor="tanggalPemanenan" className="form-label">Tanggal Panen</label>
                <input
                  type="date"
                  className="form-control"
                  id="tanggalPemanenan"
                  value={tanggalPemanenan}
                  onChange={(e) => setTanggalPemanenan(e.target.value)}
                  placeholder="Product Name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="varietasSingkong" className="form-label">Varian Singkong</label>
                <input
                  type="text"
                  className="form-control"
                  id="varietasSingkong"
                  value={varietasSingkong}
                  onChange={(e) => setVarietasSingkong(e.target.value)}
                  placeholder="Varietas"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="estimasiBerat" className="form-label">Estimasi Berat (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  id="estimasiBerat"
                  value={estimasiBerat}
                  onChange={(e) => setEstimasiBerat(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="estimasiHarga" className="form-label">Harga per kg (Rp)</label>
                <input
                  type="number"
                  className="form-control"
                  id="estimasiHarga"
                  value={estimasiHarga}
                  onChange={(e) => setEstimasiHarga(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="mb-3">
                <div className="btn-group">
                  <button type="submit" className="btn btn-success mt-3">Save</button>
                  <NavLink to='/products' className='btn btn-info mt-3'>Back</NavLink>
                </div>
              </div>
            </div>
          </form>
    </div>

    </>
  );
};

export default FormAddProduct;
