import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector jika kamu menggunakan Redux

const RoleList = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
    if (user?.uuid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/users/${user.uuid}`);
          console.log(response.data);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [user?.uuid]); // Tambahkan user?.uuid sebagai dependency untuk lebih aman

  return (
    <div>
      <h1 className="title">User Details</h1>
      {userData ? (
        <>
          {userData.additionalInfo?.url && (
            <img src={userData.additionalInfo.url} alt={userData.name} style={{ maxWidth: '10%', height: '10%' }} />
          )}
          <p>ID Blockchain: {userData.uuid}</p>
          <p>Nama: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Nomor HP: {userData.additionalInfo.nohp}</p>
          <p>Alamat: {userData.additionalInfo.alamat}</p>

          {user && (userData.role === "petani") && (
            <Link
              to={`/datapetani/edit/${userData.uuid}`}
              className="button is-small is-info mt-5"
            >
              Edit {userData.role}
            </Link>
          )}
          {user && (userData.role === "pabrik") && (
            <Link
              to={`/datapabrik/edit/${userData.uuid}`}
              className="button is-small is-info mt-5"
            >
              Edit {userData.role}
            </Link>
          )}
          {user && (userData.role === "logistik") && (
            <Link
              to={`/datalogistik/edit/${userData.uuid}`}
              className="button is-small is-info mt-5"
            >
              Edit {userData.role}
            </Link>
          )}

        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default RoleList;
