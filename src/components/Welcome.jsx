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
          const response = await axios.get(`https://c-greenproject.org:8000/users/${user.uuid}`);
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
    <>
    <style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>


    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="display-4 gradient-text">Dashboard</h1>
          <h2 className="subtitle gradient-text">
            Welcome Back <strong>{user && user.name}</strong>
          </h2>
          {userData?.additionalInfo?.url && (
            <div className="my-3">
              <img 
                src={userData.additionalInfo.url} 
                alt={userData.name} 
                className="img-fluid rounded-circle" 
                style={{ maxWidth: '150px', height: 'auto' }} 
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="row pt-6">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Role Anda</h5>
              <p className="card-text gradient-text"><strong>{user && user.role}</strong></p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">ID Blockchain Anda</h5>
              <p className="card-text gradient-text"><strong>{user && user.uuid}</strong></p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Email Anda</h5>
              <p className="card-text gradient-text"><strong>{user && user.email}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Welcome;
