import { Button, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/panic-button.svg";

export default class ActivationAccountPage extends Component {
  render() {
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
          />
          <TextField
            id="outlined-basic"
            label="Kode OTP"
            variant="outlined"
            required
            className="w-full"
            size="small"
          />
          <Button variant="contained">Aktifkan</Button>
          <Typography textAlign={"center"} marginTop={1} color="black">
            <NavLink className="text-sm font-bold" to="/">
              Masuk <span className="font-thin">Di sini!</span>
            </NavLink>
          </Typography>
        </div>
      </div>
    );
  }
}
