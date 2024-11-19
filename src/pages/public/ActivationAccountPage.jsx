import { Button, TextField, Typography } from "@mui/material";
import React, { Component, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import logo from "../../assets/panic-button.svg";
import AlertComponent from "../../components/AlertComponent";
import UserService from "../../services/service/UserService";
import { GuidApp } from "../../helpers/GuidApplication";

const ActivationAccountPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [referred, setReferred] = useState(false);
  const [loading, setLoading] = useState(false);
  const guidApp = GuidApp;

  const validate = () => {
    if (email === "") {
      AlertComponent.Error("Email harus diisi!");
    } else if (otp === "") {
      AlertComponent.Error("Kode otp harus diisi!");
    } else {
      activateAccount();
    }
  };

  const activateAccount = async () => {
    const data = { email, otp, guidAplication: guidApp };
    setLoading(true);
    try {
      const res = await UserService.activateAccount(data);
      if (res.data.success) {
        AlertComponent.SuccessResponse("Berhasil Mengaktifkan Akun");
      } else {
        AlertComponent.Error(res.data.message);
      }
    } catch (error) {
      AlertComponent.Error(
        error.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
      setReferred(true);
    }
  };

  if (referred) return <Navigate to={"/"} />;
  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <img src={logo} alt="Panic Button 112" />
      <h1 className="text-3xl text-main font-bold tracking-wider">
        Panic Button
      </h1>
      <h2 className="text-xl font-bold tracking-wider">Aktifkan Akun</h2>
      <div className="min-w-[40%] flex flex-col gap-5 mt-5">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
          className="w-full"
          size="small"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Kode OTP"
          variant="outlined"
          required
          className="w-full"
          size="small"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button variant="contained" onClick={validate}>
          {loading ? "Loading..." : "Aktivasi"}
        </Button>
        <Typography textAlign={"center"} marginTop={1} color="black">
          <NavLink className="text-sm font-bold" to="/">
            Masuk <span className="font-thin">Di sini!</span>
          </NavLink>
        </Typography>
      </div>
    </div>
  );
};

export default ActivationAccountPage;
