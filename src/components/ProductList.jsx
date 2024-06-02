import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts(); // Refresh the products list after deletion
  };

  return (
    <div>
      <h1 className="title">Order Panen</h1>
      <h2 className="subtitle">Order Panenan</h2>
      {user && (user.role === "petani" || user.role === "admin") && (
        <Link to="/products/add" className="button is-primary mb-2">
          Add Order Panen
        </Link>
      )}

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama petani</th>
            <th>Varietas</th>
            <th>Status Order</th>
            <th>Tanggal Panen</th>
            <th>Estimasi Berat(kg)</th>
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
                {user && (user.role === "admin") && (
                  <div>
                    <Link
                      to={`/products/edit/${product.uuid}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.uuid)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </div>
                )}
                {user && (product.namaPerusahaan === null || product.namaPerusahaan === "") && (user.role === "pabrik") && (
                  <Link
                    to={`/products/acc/${product.uuid}`}
                    className="button is-small is-primary"
                  >
                    Terima Order
                  </Link>
                )}
                {user && (product.namaLogistik === null || product.namaLogistik === "") && (user.role === "logistik") && (
                  <Link
                    to={`/products/acc/${product.uuid}`}
                    className="button is-small is-primary"
                  >
                    Terima Order
                  </Link>
                )}
                {user && (user.role === "admin") && (
                  <Link
                    to={`/products/acc/${product.uuid}`}
                    className="button is-small is-primary"
                  >
                    Terima Order
                  </Link>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
