import React, { useEffect } from "react";
import Layout from "../Layout";
import RoleList from "../../components/RoleList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const DataLogistik = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && user.role !== "logistik") {
            navigate("/datalogistik");
        }
    }, [isError, user, navigate]);
    return (
        <Layout>
            <RoleList />
        </Layout>
    );
};

export default DataLogistik;
