import React, { Component } from "react";
import logo from "../../assets/panic-button.svg";
import { Button, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default class ForgotPasswordPage extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
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
          />
          <Button variant="contained">Kirim</Button>
          <Typography textAlign={"center"} marginTop={1} color="black">
            <NavLink to="/">Kembali</NavLink>
          </Typography>
        </div>
      </div>
    );
  }
}
