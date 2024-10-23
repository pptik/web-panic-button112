import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import logo from "../../assets/panic-button.svg";
import {
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
import { GuidApp } from "../../helpers/GuidApplication";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const isOpd = location.pathname === "/register-opd";
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [guidAplication] = useState(GuidApp);
  const [companies, setCompanies] = useState([]);
  const [refferrer, setRefferrer] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const res = await UserService.getCompanies();
      if (res.data.success) {
        setCompanies(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  // Constants for roles
  const ADMIN_ROLE = "admin";
  const SUPER_ADMIN_ROLE = "super_admin";

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    setRole(isOpd ? ADMIN_ROLE : SUPER_ADMIN_ROLE);
  }, [isOpd]);

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <img src={logo} alt="Panic Button 112" />
      <h1 className="text-3xl text-main font-bold tracking-wider">
        Panic Button {isOpd && " - OPD"} {/* Menampilkan jika opd */}
      </h1>
      <h2 className="text-xl font-bold tracking-wider">Register</h2>
      <div className="min-w-[40%] flex flex-col gap-5 mt-5">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" size="small">
            Asal Instansi
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
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
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
};

export default RegisterPage;
