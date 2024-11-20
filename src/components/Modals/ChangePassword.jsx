import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import AlertComponent from "../AlertComponent";
import UserService from "../../services/service/UserService";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
const ChangePassword = ({ isOpen, onClose, data }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleShowOldPassword = async () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleShowNewPassword = async () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (oldPassword === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan password lama");
      return;
    }
    if (email === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan Email");
      return;
    }
    if (newPassword === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan password baru");
      return;
    }
    let data = {
      email: email,
      currentPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const response = await UserService.updatePassword(data);
      setIsLoading(false);
      onClose();
      AlertComponent.SuccessResponse("Berhasil Mengubah Password");
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      AlertComponent.Error(error.response.data.message);
    }
  };

  useEffect(() => {
    setEmail(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={isOpen}
      size="xs"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogBody>
        <h1 className="text-blue font-bold text-xl tracking-wider mb-2 text-center">
          Ubah Password
        </h1>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col">
            <Input
              label="Email"
              type="email"
              id="OldPass"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <Input
              label="Password Lama"
              type={showOldPassword ? "text" : "password"}
              id="OldPass"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Password Lama"
              icon={
                showOldPassword ? (
                  <AiFillEye
                    className="cursor-pointer"
                    onClick={handleShowOldPassword}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="cursor-pointer"
                    onClick={handleShowOldPassword}
                  />
                )
              }
            />
          </div>
          <div className="flex flex-col">
            <Input
              label="Password Baru"
              type={showNewPassword ? "text" : "password"}
              id="NewPass"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password Baru"
              icon={
                showNewPassword ? (
                  <AiFillEye
                    className="cursor-pointer"
                    onClick={handleShowNewPassword}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="cursor-pointer"
                    onClick={handleShowNewPassword}
                  />
                )
              }
            />
          </div>
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

export default ChangePassword;
