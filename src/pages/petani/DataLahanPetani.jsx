import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const DataLahanPetani = () => {
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
                    console.log(response.data);
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
                    const response = await axios.get(`http://localhost:5000/petanis`);
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
        if (user && user.role !== "petani") {
            navigate("/datalahan");
        }

    }, [isError, user, navigate]);

    const deleteProduct = async (id) => {
        // Tampilkan dialog konfirmasi penghapusan
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`http://localhost:5000/petani/${id}`);
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
                <h1 className="title">Data Lahan Petani</h1>
                <Link to="/datalahan/add" className="button is-primary mb-2">
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

                                <h1 className=" is-size-3 has-text-weight-bold mb-3 mt-6">1. Informasi Lahan</h1>
                                <p><strong> ID Blockchain:</strong> {data.idlahan}</p>
                                <p><strong> Lokasi Lahan:</strong> {data.lokasilahan}</p>
                                <p><strong> Luas Lahan: </strong>{data.luaslahan}</p>
                                <p><strong> Status Lahan:</strong> {data.statuskepemilikanlahan}</p>
                                <h1 className="is-size-3 has-text-weight-bold my-4">2. Data Produksi</h1>
                                <p><strong>Periode Tanam Mulai:</strong>  {data.periodeTanamMulai}</p>
                                <p><strong>Periode Tanam Selesai:</strong>  {data.periodeTanamSelesai}</p>
                                <p><strong>Varietas:</strong> {data.varietassingkong}</p>
                                <p><strong>Estimasi Produksi:</strong>  {data.estimasiproduksi}</p>
                                <p><strong>Produksi Aktual:</strong>  {data.produksiaktual}</p>
                                <h1 className="is-size-3 has-text-weight-bold my-4">3. Penggunaan Pupuk dan Pestisida</h1>
                                <p><strong>Jenis Pupuk:</strong>  {data.jenispupuk}</p>
                                <p><strong>Jumlah Pupuk:</strong>  {data.jumlahpupuk}</p>
                                <h1 className="is-size-3 has-text-weight-bold my-4">4. Aspek Ekonomi</h1>
                                <p><strong>Harga Jual:</strong>  {data.hargajual}</p>
                                <p><strong>Total Pendapatan:</strong>  {data.totalpendapatan}</p>
                                <p><strong>Pendapatan Bersih:</strong>  {data.pendapatanbersih}</p>
                                <h1 className="is-size-3 has-text-weight-bold my-4 ">5. Tambahan</h1>
                                <p className="pb-6"><strong>Catatan Tambahan: </strong> {data.catatantambahan}</p>
                                {user && (userAuth?.role === "admin") && (
                                    <div>
                                        <Link
                                            to={`/datalahan/edit/${data.id}`}
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

export default DataLahanPetani;
