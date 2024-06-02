import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut, IoBusiness, IoFastFood, IoAirplane, IoBagHandle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
    <aside className="p-2 shadow-sm">
      <p className="fw-bold">General</p>
      <ul className="list-unstyled">
        <li className="mb-2">
          <NavLink to="/dashboard" className="text-decoration-none">
            <IoHome /> Dashboard
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/products" className="text-decoration-none">
            <IoBagHandle /> Panen
          </NavLink>
        </li>
      </ul>
      
      {user && user.role === "admin" && (
        <div>
          <p className="fw-bold">Admin</p>
          <ul className="list-unstyled">
            <li className="mb-2">
              <NavLink to="/users" className="text-decoration-none">
                <IoPerson /> Users
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      
      <div>
        <p className="fw-bold">Data-data</p>
        {user && user.role === "pabrik" && (
          <ul className="list-unstyled">
            <li className="mb-2">
              <NavLink to="/datapabrik" className="text-decoration-none">
                <IoPerson /> Profile Pabrik
              </NavLink>
            </li>
          </ul>
        )}
        {user && (user.role === "admin" || user.role === "pabrik") && (
          <ul className="list-unstyled">
            <li className="mb-2">
              <NavLink to="/data-pabrik" className="text-decoration-none">
                <IoBusiness /> Data Pabrik
              </NavLink>
            </li>
          </ul>
        )}
        {user && user.role === "petani" && (
          <ul className="list-unstyled">
            <li className="mb-2">
              <NavLink to="/datapetani" className="text-decoration-none">
                <IoPerson /> Profile Petani
              </NavLink>
            </li>
          </ul>
        )}
        {user && (user.role === "admin" || user.role === "petani") && (
          <ul className="list-unstyled">
            <li className="mb-2">
              <NavLink to="/datalahan" className="text-decoration-none">
                <IoFastFood /> Data Petani
              </NavLink>
            </li>
          </ul>
        )}
        {user && user.role === "logistik" && (
          <ul className="list-unstyled">
            <li className="mb-2">
              <NavLink to="/datalogistik" className="text-decoration-none">
                <IoPerson /> Profile Logistik
              </NavLink>
            </li>
          </ul>
        )}
        {user && (user.role === "admin" || user.role === "logistik") && (
          <ul className="list-unstyled">
            <li className="mb-2">
              <NavLink to="/data-logistik" className="text-decoration-none">
                <IoAirplane /> Data Logistik
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      
      <p className="fw-bold">Settings</p>
      <ul className="list-unstyled">
        <li className="mb-2">
          <button onClick={logout} className="btn btn-white">
            <IoLogOut /> Logout
          </button>
        </li>
      </ul>
    </aside>
  </div>
  );
};

export default Sidebar;
