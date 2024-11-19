import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom"; // Import useLocation
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
import AlertComponent from "../../components/AlertComponent";
import UserService from "../../services/service/UserService";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const isOpd = location.pathname === "/register-opd";
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [companyGuid, setCompanyGuid] = useState("");
  const [guidAplication] = useState(GuidApp);
  const [companies, setCompanies] = useState([]);
  const [refferrer, setRefferrer] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const validasi = () => {
    if (!companyGuid) {
      AlertComponent.Warning("Instansi harus dipilih!");
    } else if (!name) {
      AlertComponent.Warning("Nama harus diisi!");
    } else if (!phoneNumber) {
      AlertComponent.Warning("Telepon harus diisi!");
    } else if (!email) {
      AlertComponent.Warning("Email harus diisi!");
    } else if (!password) {
      AlertComponent.Warning("Password harus diisi!");
    } else {
      register();
    }
  };

  const register = async () => {
    const data = {
      name,
      email,
      password,
      companyGuid,
      phoneNumber,
      guidAplication,
      role,
    };
    setLoading(true);
    try {
      const res = await UserService.register(data);
      if (res.data.success) {
        AlertComponent.SuccessResponse("Berhasil Register");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setRefferrer(true);
      } else {
        AlertComponent.Warning(res.data.message);
      }
    } catch (error) {
      AlertComponent.Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRole(isOpd ? ADMIN_ROLE : SUPER_ADMIN_ROLE);
  }, [isOpd]);

  useEffect(() => {
    getCompany();
  }, []);

  return refferrer ? (
    <Navigate to={"/activation-account"} />
  ) : (
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
            label="Asal Instansi"
            size="small"
            name="company"
            value={companyGuid}
            onChange={(e) => setCompanyGuid(e.target.value)}
          >
            {companies?.map((com) => (
              <MenuItem key={com.guid} value={com.guid}>
                {com.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Nama Lengkap"
          variant="outlined"
          required
          className="w-full"
          size="small"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="No. Telepon"
          variant="outlined"
          required
          className="w-full"
          size="small"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
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
          label="Password"
          variant="outlined"
          required
          className="w-full"
          size="small"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Button variant="contained" onClick={validasi}>
          {loading ? "Loading..." : "Daftar"}
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

export default RegisterPage;
