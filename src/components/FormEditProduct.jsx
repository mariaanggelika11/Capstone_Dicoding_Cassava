import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `https://c-greenproject.org:8000/products/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://c-greenproject.org:8000/products/${id}`, {
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
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


    <div className="container">
      <h2 className="subtitle gradient-text">Edit Product</h2>
          <form onSubmit={updateProduct}>
            <div className="content">
              <p className="has-text-centered">{msg}</p>
              <div className="form-group">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                />
              </div>
              <div className="form-group">
                <label className="label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
              </div>
              <div className="form-group">
                <div className="btn-group">
                <button type="submit" className="btn btn-success mt-3">
                  Update
                </button>
                <NavLink to='/products' className='btn btn-info mt-3'>Back</NavLink>
                </div>
              </div>
            </div>
          </form>
    </div>
    </>
  );
};

export default FormEditProduct;
