import React, { useState } from "react";
import logo from "../../assets/panic-button.svg";
import { Button, TextField, Typography } from "@mui/material";
import { Navigate, NavLink } from "react-router-dom";
import UserService from "../../services/service/UserService";
import AlertComponent from "../../components/AlertComponent";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [referrer, setReferrer] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const validate = () => {
    if (!email) {
      AlertComponent.Warning("Email harus diisi");
    } else {
      forgotPassword();
    }
  };

  const forgotPassword = async () => {
    const data = { email };
    setLoading(true);
    try {
      const res = await UserService.forgotPassword(data);
      if (res.data.success) {
        AlertComponent.SuccessResponse(res.data.message);
        setReferrer(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      AlertComponent.Error(
        error.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
      setReferrer(true);
    }
  };

  if (referrer) return <Navigate to={"/"} />;

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <img src={logo} alt="Panic Button 112" />
      <h1 className="text-3xl text-main font-bold tracking-wider">
        Panic Button
      </h1>
      <h2 className="text-xl font-bold tracking-wider">Lupa Password</h2>
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
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={validate}>
          {loading ? "Loading..." : "Kirim"}
        </Button>
        <Typography textAlign={"center"} marginTop={1} color="black">
          <NavLink to="/">Kembali</NavLink>
        </Typography>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
