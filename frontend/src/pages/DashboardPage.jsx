// src/pages/DashboardPage.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

import Layout from "./Layout";
import SensorDashboard from "../components/SensorDashboard";
import Welcome from "../components/Welcome";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <Welcome />
      <SensorDashboard />
    </Layout>
  );
};

export default DashboardPage;
