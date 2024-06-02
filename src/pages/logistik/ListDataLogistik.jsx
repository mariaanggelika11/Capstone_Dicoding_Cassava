import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const ListDataLogistik = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState([]);
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
        if (user?.uuid) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/users/${user.uuid}`);
                    setUserAuth(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [user?.uuid]); // Tambahkan user?.uuid sebagai dependency untuk lebih aman

    useEffect(() => {
        if (user?.uuid) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/logistik`);
                    setUserData(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [user?.uuid]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && user.role !== "logistik") {
            navigate("/data-logistik");
        }

    }, [isError, user, navigate]);

    const deleteProduct = async (id) => {
        // Tampilkan dialog konfirmasi penghapusan
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`http://localhost:5000/logistik/${id}`);
                // Filter out the deleted data from the userData state
                const updatedUserData = userData.filter(data => data.id !== id);
                setUserData(updatedUserData); // Set the state with the filtered data
                // Tampilkan pesan sukses atau lakukan sesuatu sebagai konfirmasi penghapusan
                alert("Data berhasil dihapus.");
            } catch (error) {
                console.error("Error deleting data:", error);
                // Handle error, e.g., show an error message
                alert("Terjadi kesalahan saat menghapus data.");
            }
        }
    };



    return (
        <Layout>
            <div>
                <h1 className="title">Data Llogistik</h1>
                <Link to="/data-logistik/add" className="button is-primary mb-2">
                    Add New
                </Link>
                {userData.length ? (
                    userData.map((data, index) => (
                        <div key={index} >
                            <div className="card px-6 my-6">
                                {user && (userAuth?.role === "admin") && (
                                    <div>
                                        <h1 className=" is-size-3 has-text-weight-bold">Nama Petani: {data.user.name}</h1>
                                        <h1 className=" is-size-3 has-text-weight-bold">Email Petani: {data.user.email}</h1>
                                    </div>
                                )}

                                <h1 className=" is-size-3 has-text-weight-bold mb-3 mt-6">1. Detail Pengiriman</h1>
                                <p><strong> ID Blockchain:</strong> {data.idPengiriman}</p>
                                <p><strong> tanggalWaktuPengiriman:</strong> {data.tanggalWaktuPengiriman}</p>
                                <p><strong> asal: </strong>{data.asal}</p>
                                <p><strong> tujuan:</strong> {data.tujuan}</p>
                                <h1 className="is-size-3 has-text-weight-bold my-4">2. Detail Kendaraan</h1>
                                <p><strong>estimasiWaktuTiba:</strong>  {data.estimasiWaktuTiba}</p>
                                <p><strong>nomorPolisiKendaraan:</strong>  {data.nomorPolisiKendaraan}</p>
                                <p><strong>jenisKendaraan:</strong> {data.jenisKendaraan}</p>
                                <p><strong>kapasitasAngkut:</strong>  {data.kapasitasAngkut}</p>
                                <h1 className="is-size-3 has-text-weight-bold my-4">3.Biaya dan Efisiensi</h1>
                                <p><strong>biayaTransportasi:</strong>  {data.biayaTransportasi}</p>
                                <p><strong>catatanEfisiensiRute:</strong>  {data.catatanEfisiensiRute}</p>
                                <h1 className="is-size-3 has-text-weight-bold my-4">4. Feedback</h1>
                                <p><strong>kondisiPengiriman:</strong>  {data.kondisiPengiriman}</p>
                                <p><strong>catatanDariPenerima:</strong>  {data.catatanDariPenerima}</p>

                                {user && (userAuth?.role === "admin") && (
                                    <div>
                                        <Link
                                            to={`/data-logistik/edit/${data.id}`}
                                            className="button is-small is-info my-5"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteProduct(data.id)}
                                            className="button is-small is-danger"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
        </Layout>
    );
};

export default ListDataLogistik;
