import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
    if (user && user.uuid) {
      const fetchData = async () => {
        try {
          // Lakukan permintaan GET ke endpoint
          const response = await axios.get(`http://localhost:5000/users/${user.uuid}`);
          console.log(response.data)
          // Simpan data ke state
          setUserData(response.data);
        } catch (error) {
          // Tangani kesalahan jika permintaan gagal
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [user, user?.uuid]); // Tambahkan user.uuid sebagai dependency

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
      {userData?.additionalInfo?.url && (
        <img src={userData.additionalInfo.url} alt={userData.name} style={{ maxWidth: '10%', height: '10%' }} />
      )}

      <h2 className="subtitle">
        Role Anda: <strong>{user && user.role}</strong>
      </h2>
      <h2 className="subtitle">
        ID Blokchain Anda: <strong>{user && user.uuid}</strong>
      </h2>
      <h2 className="subtitle">
        Email Anda: <strong>{user && user.email}</strong>
      </h2>



    </div>
  );
};

export default Welcome;
