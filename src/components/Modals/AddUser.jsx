import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { GetGuidCompany } from "../../helpers/AuthHeaders";
import { GuidApp } from "../../helpers/GuidApplication";
import AlertComponent from "../AlertComponent";
import UserService from "../../services/service/UserService";

export const AddUser = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [guidApp, setGuidApp] = useState(GuidApp);
  const [company, setCompany] = useState(GetGuidCompany());

  useEffect(() => {
    setGuidApp(GuidApp);
    setCompany(GetGuidCompany());
  }, []);

  const handleSave = async () => {
    if (name === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan nama");
      return;
    }
    if (email === "") {
      onClose();
      AlertComponent.Error("Silakan masukan email");
      return;
    }
    if (password === "") {
      onClose();
      AlertComponent.Error("Silakan masukan password");
      return;
    }
    if (role === "") {
      onClose();
      AlertComponent.Error("Silakan pilih role");
      return;
    }
    if (phone === "") {
      onClose();
      AlertComponent.Error("Silakan masukan telepon");
      return;
    }
    setIsLoading(true);
    let data = {
      email: email,
      name: name,
      password: password,
      phoneNumber: phone,
      role: role,
      guidAplication: guidApp,
      companyGuid: company,
    };
    try {
      const response = await UserService.register(data);
      setIsLoading(false);
      onClose();
      AlertComponent.SuccessResponse(response.data.message);
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      onClose();
      AlertComponent.Error(error.response.data.message);
    }
  };

  return (
    <Dialog
      open={isOpen}
      handler={() => onClose()}
      size="sm"
      className="bg-transparent shadow-none"
    >
      <Card className="flex flex-col">
        <CardBody className="flex flex-col gap-2">
          <Typography variant="h4" color="blue-gray">
            Tambah Pengguna
          </Typography>
          <Input
            label="Nama Lengkap"
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            crossOrigin={undefined}
            required
          />
          <Input
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            crossOrigin={undefined}
            required
          />
          <Input
            label="Telepon"
            size="lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            crossOrigin={undefined}
            required
          />
          <Input
            label="Password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            crossOrigin={undefined}
            required
          />
          <select
            name="guid"
            id="guid"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="p-3 border rounded-md border-blue-gray-200"
          >
            <option value="">Pilih Role</option>
            <option value="super_admin">Super Admin 112</option>
            <option value="admin">Admin OPD</option>
            <option value="petugas">Petugas</option>
            <option value="user">Pengguna</option>
          </select>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="filled"
            className="bg-main flex justify-center items-center"
            onClick={handleSave}
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="mx-auto" /> : "Simpan"}
          </Button>
          <Button variant="text" fullWidth onClick={onClose} className="mt-2">
            Batal
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
