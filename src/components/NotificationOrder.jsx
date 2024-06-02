/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const NotificationOrder = () => {
    const { user } = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    };

    return (
        <div>
            <h1 className="title mt-6">Notifikasi Order</h1>
            <h2 className="subtitle">Order Status</h2>
            <table className="table is-striped is-fullwidth">
                <thead>
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
    );
};

export default NotificationOrder;
