import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("https://c-greenproject.org:8000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`https://c-greenproject.org:8000/users/${userId}`);
    getUsers();
  };

  return (
    <>
      <style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>


    <div className="container">
      <h2 className="subtitle gradient-text">List of Users</h2>
      <Link to="/users/add" className="btn btn-primary mb-2">
        Add New
      </Link>
      <table className="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Kode Blokchain</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.uuid}</td>
              <td>
                <div className="btn-group">
                  <Link
                    to={`/users/edit/${user.uuid}`}
                    className="btn btn-sm btn-info"
                  >
                     <i className="fas fa-edit"></i>
                  </Link>
                  <button
                    onClick={() => deleteUser(user.uuid)}
                    className="btn btn-sm btn-danger"
                  >
                     <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

</>
  );
};

export default Userlist;
