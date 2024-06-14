/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const NotificationOrder = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
        }, []);

    const getProducts = async () => {
        const response = await axios.get("https://c-greenproject.org:8000/products");
        setProducts(response.data);
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2 className="gradient-text">Order Status</h2>
                </div>
                <div className="card-body">
                    <table className="table table-sm table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>No</th>
                                <th>Tanggal Panen</th>
                                <th>Status Order</th>
                                <th>Nama Perusahaan</th>
                                <th>No HP Perusahaan</th>
                                <th>Nama Logistik</th>
                                <th>No HP Logistik</th>
                                <th>Plat Nomor Kendaraan</th>
                                <th>Kode Blokchain</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.uuid}>
                                    <td>{index + 1}</td>
                                    <td>{product.tanggalPemanenan}</td>
                                    <td>{product.statusOrder}</td>
                                    <td>{product.namaPerusahaan}</td>
                                    <td>{product.noHpPerusahaan}</td>
                                    <td>{product.namaLogistik}</td>
                                    <td>{product.noHpLogistik}</td>
                                    <td>{product.platnoLogistik}</td>
                                    <td>{product.uuid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NotificationOrder;
