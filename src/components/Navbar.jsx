/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };


  useEffect(() => {
    // Pastikan user dan user.uuid tersedia sebelum melakukan fetch
    if (user && user.uuid) {
      const fetchData = async () => {
        try {
          // Lakukan permintaan GET ke endpoint
          const response = await axios.get(
            `https://c-greenproject.org:8000/users/${user.uuid}`
          );
          console.log(response.data);
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" role="navigation" aria-label="main navigation">
    <div className="container-fluid">
        <NavLink to="/dashboard" className="navbar-brand gradient-text fw-bold">Cassava Super</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user && user.name}
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                    <button onClick={logout} className="dropdown-item btn btn-sm">Logout</button>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
  );
};

export default Navbar;
