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
          const response = await axios.get(`https://c-greenproject.org:8000/users/${user.uuid}`);
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
  <>
   <style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>

  <div className="container">
      <h1 className="mb-4 gradient-text">User Details</h1>
      {userData ? (
          <>
              {userData.additionalInfo?.url && (
                  <div className="mb-3">
                      <img src={userData.additionalInfo.url} alt={userData.name} className="img-thumbnail" style={{ maxWidth: '150px' }} />
                  </div>
              )}
              <ul className="list-group mb-4">
                  <li className="list-group-item"><strong>ID Blockchain:</strong> {userData.uuid}</li>
                  <li className="list-group-item"><strong>Nama:</strong> {userData.name}</li>
                  <li className="list-group-item"><strong>Email:</strong> {userData.email}</li>
                  <li className="list-group-item"><strong>Nomor HP:</strong> {userData.additionalInfo.nohp}</li>
                  <li className="list-group-item"><strong>Alamat:</strong> {userData.additionalInfo.alamat}</li>
              </ul>

              {user && userData.role === "petani" && (
                  <Link to={`/datapetani/edit/${userData.uuid}`} className="btn btn-info btn-sm mb-3">
                      Edit {userData.role}
                  </Link>
              )}
              {user && userData.role === "pabrik" && (
                  <Link to={`/datapabrik/edit/${userData.uuid}`} className="btn btn-info btn-sm mb-3">
                      Edit {userData.role}
                  </Link>
              )}
              {user && userData.role === "logistik" && (
                  <Link to={`/datalogistik/edit/${userData.uuid}`} className="btn btn-info btn-sm mb-3">
                      Edit {userData.role}
                  </Link>
              )}
          </>
      ) : (
          <p>Loading user details...</p>
      )}
  </div>
  </>
  );
};

export default RoleList;
