/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import ilustrasi from '../assets/img/login-ilustrasi.webp';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    // internal styling 
    <>
    <style jsx>{`
    @media (max-width: 450px) { 
      * {
        margin: 4px;
        font-size: 12px;
      }
    }
    `}</style>


    <section className="vh-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={ilustrasi} className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={Auth}>
                <div className="d-flex align-items-center my-4">
                <h1 className="text-center fw-bold mx-3 mb-0">Login</h1>
              </div>
              {/* jika ada error  */}
              {isError && <div className=" alert alert-danger" role="alert">{message}</div>}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">Email address</label>
                <input 
                  type="email" 
                  className="form-control form-control-lg" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter a valid email address" 
                  required 
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">Password</label>
                <input 
                type="password" 
                className="form-control form-control-lg" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"  
                required/>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <a href="/" className="text-body">Back To Home ?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg" style={{ width:"100%" }}>{isLoading ? "Loading..." : "Login"}</button>
              </div>
            </form>
          </div>
        </div>
    </section>
  </>  
  );
};

export default Login;
