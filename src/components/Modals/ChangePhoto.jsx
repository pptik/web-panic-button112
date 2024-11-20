import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import AvatarEditor from "react-avatar-edit";
import AlertComponent from "../AlertComponent";
import UserService from "../../services/service/UserService";

const ChangePhoto = ({ isOpen, onClose }) => {
  const [preview, setPreview] = useState(null);
  const [src, setSrc] = useState(null);

  const handleClose = () => {
    setPreview(null);
    onClose();
  };

  const onCloseEditor = () => {
    setPreview(null);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const updatePhoto = async () => {
    try {
      if (!preview) {
        AlertComponent.Error("Silakan pilih dan potong foto terlebih dahulu.");
        return;
      }

      const response = await fetch(preview);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", blob);

      const responseUpload = await UserService.UploadImage(formData);
      if (responseUpload.data.success) {
        AlertComponent.SuccessResponse("Berhasil Mengubah Photo");
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (e) {
      AlertComponent.Error(e || "Terjadi kesalahan saat mengupload foto.");
    }
  };

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
        <h1 className="text-black font-bold tracking-wider text-center mb-3">
          Ubah Foto
        </h1>
        <div className="flex flex-col items-center gap-3 mt-3">
          <AvatarEditor
            width={300}
            height={300}
            onCrop={onCrop}
            onClose={onCloseEditor}
            src={src}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={handleClose} className="mr-1 text-main">
          <span>Batal</span>
        </Button>
        <Button className="mr-1 bg-main" onClick={updatePhoto}>
          Simpan
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ChangePhoto;
