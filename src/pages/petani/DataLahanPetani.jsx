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
                    const response = await axios.get(`https://c-greenproject.org:8000/users/${user.uuid}`);
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
                    const response = await axios.get(`https://c-greenproject.org:8000/petanis`);
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
<>
    <style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>

<Layout>
    <div className="container">
        <h4 className="gradient-text fw-bold">Data Lahan Petani</h4>
        <Link to="/datalahan/add" className="btn btn-primary btn-sm mb-3">
            Add New
        </Link>
        {userData.length > 0 ? (
            <div className="row" style={{ fontSize: "0.9rem" }}>
                {userData.map((data, index) => (
                    <div key={index} className="col-md-6 mb-3">
                        <div className="card shadow">
                            <div className="card-body p-3">
                                {user && userAuth?.role === "admin" && (
                                    <div className="mb-2">
                                        <h5 className="card-title gradient-text mb-1">Nama Petani: {data.user.name}</h5>
                                        <h5 className="card-title gradient-text mb-1">Email Petani: {data.user.email}</h5>
                                    </div>
                                )}
                                <div className="mb-2">
                                    <div className="border p-3 mb-3">
                                        <h5 className="card-title gradient-text fw-bold">Informasi Lahan</h5>
                                        <p className="mb-1"><strong className="gradient-text">ID Blockchain:</strong> {data.idlahan}</p>
                                        <p className="mb-1"><strong className="gradient-text">Lokasi Lahan:</strong> {data.lokasilahan}</p>
                                        <p className="mb-1"><strong className="gradient-text">Luas Lahan:</strong> {data.luaslahan}</p>
                                        <p className="mb-1"><strong className="gradient-text">Status Lahan:</strong> {data.statuskepemilikanlahan}</p>
                                    </div>

                                    <div className="border p-3 mb-3">
                                        <h5 className="card-title gradient-text fw-bold">Data Produksi</h5>
                                        <p className="mb-1"><strong className="gradient-text">Periode Tanam Mulai:</strong> {data.periodeTanamMulai}</p>
                                        <p className="mb-1"><strong className="gradient-text">Periode Tanam Selesai:</strong> {data.periodeTanamSelesai}</p>
                                        <p className="mb-1"><strong className="gradient-text">Varietas:</strong> {data.varietassingkong}</p>
                                        <p className="mb-1"><strong className="gradient-text">Estimasi Produksi:</strong> {data.estimasiproduksi}</p>
                                        <p className="mb-1"><strong className="gradient-text">Produksi Aktual:</strong> {data.produksiaktual}</p>
                                    </div>

                                    <div className="border p-3 mb-3">
                                        <h5 className="card-title gradient-text  fw-bold">Penggunaan Pupuk dan Pestisida</h5>
                                        <p className="mb-1"><strong className="gradient-text">Jenis Pupuk:</strong> {data.jenispupuk}</p>
                                        <p className="mb-1"><strong className="gradient-text">Jumlah Pupuk:</strong> {data.jumlahpupuk}</p>
                                    </div>

                                    <div className="border p-3 mb-3">
                                        <h5 className="card-title gradient-text  fw-bold">Aspek Ekonomi</h5>
                                        <p className="mb-1"><strong className="gradient-text">Harga Jual:</strong> {data.hargajual}</p>
                                        <p className="mb-1"><strong className="gradient-text">Total Pendapatan:</strong> {data.totalpendapatan}</p>
                                        <p className="mb-1"><strong className="gradient-text">Pendapatan Bersih:</strong> {data.pendapatanbersih}</p>
                                    </div>

                                    <div className="border p-3 mb-3">
                                        <h5 className="card-title gradient-text  fw-bold">Tambahan</h5>
                                        <p className="mb-1"><strong className="gradient-text">Catatan Tambahan:</strong> {data.catatantambahan}</p>
                                    </div>
                                </div>
                                {user && userAuth?.role === "admin" && (
                                    <div className="d-flex justify-content-end">
                                        <Link to={`/datalahan/edit/${data.id}`} className="btn btn-info btn-sm mr-2">
                                            Edit
                                        </Link>
                                        <button onClick={() => deleteProduct(data.id)} className="btn btn-danger btn-sm">
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>Loading user details...</p>
        )}
    </div>
</Layout>
</>
    );
};

export default DataLahanPetani;
