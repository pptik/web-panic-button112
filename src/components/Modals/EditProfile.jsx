import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import AlertComponent from "../AlertComponent";
import UserService from "../../services/service/UserService";
import { BiImage } from "react-icons/bi";
import { RiUserLocationFill } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const EditProfile = ({ isOpen, onClose, data = {} }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    setIsLoading(true);

    if (name === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan nama");
      return;
    }

    if (phone === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan telepon");
      return;
    }

    let data = {
      newName: name,
      newPhoneNumber: phone,
      newAddress: address,
    };

    try {
      const response = await UserService.updateProfile(data);
      setIsLoading(false);
      onClose();
      AlertComponent.SuccessResponse(
        response.data.message
      );
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      AlertComponent.Error(error);
    }
  };

  useEffect(() => {
    setName(data.name);
    setPhone(data.phoneNumber);
    setAddress(data.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={isOpen}
      size="sm"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogBody>
        <h1 className="text-blue font-bold text-xl tracking-wider mb-2 text-center">
          Edit Profile
        </h1>
        <div className="flex flex-col gap-3 mt-5">
          <Input
            label="Nama Lengkap"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Lengkap"
            icon={<FaUser />}
          />
          <Input
            type="text"
            id="telepon"
            name="telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nomor Telepon"
            label="Nomor Telepon"
            icon={<BsFillTelephoneFill />}
          />
          <Input
            label="Alamat"
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Alamat"
            icon={<RiUserLocationFill />}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          className="bg-main w-full"
          onClick={handleSave}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            "Simpan"
          )}
        </Button>
        <Button
          className="text-main mt-3 w-full"
          variant="text"
          onClick={handleClose}
        >
          Batal
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditProfile;
