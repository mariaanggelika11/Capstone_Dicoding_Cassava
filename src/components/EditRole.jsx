import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditRole = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nohp, setNohp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [foto, setFoto] = useState(null);
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`https://c-greenproject.org:8000/users/${id}`);
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
                setNohp(response.data.additionalInfo.nohp);
                // SetFoto dihilangkan karena tidak bisa menampilkan file
                setAlamat(response.data.additionalInfo.alamat);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('nohp', nohp);
            formData.append('alamat', alamat);
            formData.append('role', role);
            if (foto) {
                formData.append('foto', foto);
            }

            await axios.patch(`http://localhost:5000/users/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const handleFileChange = (e) => {
        setFoto(e.target.files[0]);
    };

    return (
    <>
<style jsx>{`
      body{
        padding-top: 80px;
      }
       `}</style>

        <div className="container">
            <h1 className="text-center mb-4 gradient-text">Update Role: {role}</h1>
            <div className="card shadow">
                <div className="card-body">
                    <form onSubmit={updateUser}>
                        {msg && <p className="text-center text-danger">{msg}</p>}
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nomor HP</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nohp}
                                onChange={(e) => setNohp(e.target.value)}
                                placeholder="Nomor HP"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Alamat</label>
                            <input
                                type="text"
                                className="form-control"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                                placeholder="Alamat"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Foto</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                                placeholder="Foto"
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-success">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
};

export default EditRole;
