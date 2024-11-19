import React, { Component } from "react";
import logo from "../../assets/panic-button.svg";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigate, NavLink } from "react-router-dom";
import { GuidApp } from "../../helpers/GuidApplication";
import UserService from "../../services/service/UserService";
import User from "../../localStorages/User";
import AlertComponent from "../../components/AlertComponent";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      email: "",
      password: "",
      loading: false,
      referrer: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  validate = () => {
    if (!this.state.email) {
      AlertComponent.Error("Email harus diisi!");
    } else if (!this.state.password) {
      AlertComponent.Error("Password harus diisi!");
    } else {
      this.onLogin();
    }
  };

  onLogin = async () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
      guidAplication: GuidApp,
    };
    this.setState({ loading: true });
    try {
      const res = await UserService.login(data);
      if (res.data.success) {
        User.SaveAppToken(res.data.data.appToken);
        User.SaveUserToken(res.data.data.userToken);
        this.setState({ referrer: true });
        AlertComponent.SuccessResponse("Berhasil Login");
      } else {
        AlertComponent.Error(res.data.message);
      }
    } catch (error) {
      AlertComponent.Error(
        error.response?.data?.message || "An error occurred"
      );
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.referrer) return <Navigate to="/dashboard" />;
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
        <img src={logo} alt="Panic Button 112" />
        <h1 className="text-3xl text-main font-bold tracking-wider">
          Panic Button
        </h1>
        <h2 className="text-xl font-bold tracking-wider">Login</h2>
        <div className="min-w-[40%] flex flex-col gap-5 mt-5">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            className="w-full"
            size="small"
            name="email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <TextField
            id="outlined-password"
            label="Password"
            variant="outlined"
            required
            className="w-full"
            size="small"
            name="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type={this.state.showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      this.state.showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={this.handleClickShowPassword}
                    edge="end"
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography textAlign={"right"} marginTop={1} color="error">
            <NavLink to="/forgot-password">*Lupa Password</NavLink>
          </Typography>
          <Button variant="contained" onClick={this.validate}>
            {this.state.loading ? "Loading..." : "Masuk"}
          </Button>
          <Typography textAlign={"center"} marginTop={1} color="black">
            <NavLink className="text-sm font-bold" to="/register-opd">
              Buat Akun <span className="font-thin">Di sini!</span>
            </NavLink>
          </Typography>
          <hr className="border-[1px] border-main" />
          <Typography textAlign={"center"} color="black">
            <NavLink className="text-sm font-bold" to="/activation-account">
              Aktivasi Akun <span className="font-thin">Di sini!</span>
            </NavLink>
          </Typography>
        </div>
      </div>
    );
  }
}
