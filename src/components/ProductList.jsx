import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("https://c-greenproject.org:8000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`https://c-greenproject.org:8000/products/${productId}`);
    getProducts();
  };

  return (
    <>
      <style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>


    <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Order Panenan</h2>
          {user && (user.role === "petani" || user.role === "admin") && (
            <Link to="/products/add" className="btn btn-primary">
              Add Order Panen
            </Link>
          )}
        </div>
        <div className="card-body">
          <table className="table table-sm table-hover">
            <thead className="thead-dark">
              <tr>
                <th>No</th>
                <th>Nama Petani</th>
                <th>Varietas</th>
                <th>Status Order</th>
                <th>Tanggal Panen</th>
                <th>Estimasi Berat (kg)</th>
                <th>Harga</th>
                <th>Kode Blockchain</th>
                {user && (user.role === "pabrik" || user.role === "admin" || user.role === "logistik") && (
                  <th>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.uuid}>
                  <td>{index + 1}</td>
                  <td>{product.user?.name || 'No Name'}</td>
                  <td>{product.varietasSingkong}</td>
                  <td>{product.statusOrder}</td>
                  <td>{product.tanggalPemanenan}</td>
                  <td>{product.estimasiBerat}</td>
                  <td>Rp. {product.estimasiHarga}</td>
                  <td>{product.uuid}</td>
                  <td>
                      <div className="btn-group" role="group">
                        {user.role === "admin" && (
                          <>
                            <Link
                              to={`/products/edit/${product.uuid}`}
                              className="btn btn-info btn-sm"
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button
                              onClick={() => deleteProduct(product.uuid)}
                              className="btn btn-danger btn-sm"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </>
                        )}
                        {user.role === "pabrik" && !product.namaPerusahaan && (
                          <Link
                            to={`/products/acc/${product.uuid}`}
                            className="btn btn-primary btn-sm"
                            title="Terima Order"
                          >
                            <i className="fas fa-check"></i>
                          </Link>
                        )}
                        {user.role === "logistik" && !product.namaLogistik && (
                          <Link
                            to={`/products/acc/${product.uuid}`}
                            className="btn btn-primary btn-sm"
                            title="Terima Order"
                          >
                            <i className="fas fa-check"></i>
                          </Link>
                        )}
                        {user.role === "admin" && (
                          <Link
                            to={`/products/acc/${product.uuid}`}
                            className="btn btn-primary btn-sm"
                            title="Terima Order"
                          >
                            <i className="fas fa-check"></i>
                          </Link>
                        )}
                      </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductList;
