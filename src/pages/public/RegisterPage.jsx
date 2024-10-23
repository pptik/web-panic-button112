import React, { Component } from "react";
import logo from "../../assets/panic-button.svg";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default class RegisterPage extends Component {
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
        <h2 className="text-xl font-bold tracking-wider">Register</h2>
        <div className="min-w-[40%] flex flex-col gap-5 mt-5">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" size="small">
              Age
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              size="small"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Nama Lengkap"
            variant="outlined"
            required
            className="w-full"
            size="small"
          />
          <TextField
            id="outlined-basic"
            label="No. Telepon"
            variant="outlined"
            required
            className="w-full"
            size="small"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            className="w-full"
            size="small"
          />
          <TextField
            id="outlined-password"
            label="Password"
            variant="outlined"
            required
            className="w-full"
            size="small"
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
          <Button variant="contained">Masuk</Button>
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
