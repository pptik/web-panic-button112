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
import UserService from "../../services/service/UserService";
import AlertComponent from "../AlertComponent";

export const UpdateUser = ({ isOpen, onClose, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [guid, setGuid] = useState("")

  useEffect(() => {    
    setName(data.name)
    setEmail(data.email)
    setAddress(data.address)
    setPhone(data.phoneNumber)
    setGuid(data.id)
  }, [])

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
    if (address === "") {
      onClose();
      AlertComponent.Error("Silakan masukan password");
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
      phoneNumber: phone,
      address: address
    };
    try {
      const response = await UserService.updateUser(guid,data);
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
            Update Pengguna
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
            label="Alamat"
            size="lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            crossOrigin={undefined}
            required
          />
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
