/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" role="navigation" aria-label="main navigation">
      <div className="container-fluid">
        <NavLink to="/dashboard" className="navbar-brand gradient-text fw-bold">Cassava Super</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasicExample" aria-controls="navbarBasicExample" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarBasicExample">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button onClick={logout} className="btn">
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;
