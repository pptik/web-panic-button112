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
import React, { useEffect, useState, useSyncExternalStore } from "react";
import CaseService from "../../services/service/CaseService";
import AlertComponent from "../AlertComponent";

export const UpdateCase = ({ isOpen, onClose, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [guid, setGuid] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {    
    if (data) {
      setName(data.sender);
      setGuid(data.id);
      setDescription(data.description);
    }
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    let data = {
      description,
    };
    try {
      const response = await CaseService.UpdateCase(guid, data);
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
            Update Case
          </Typography>
          <Input
            label="Nama Pengirim"
            size="lg"
            value={name}
            crossOrigin={undefined}
            required
            readOnly
          />
          <Input
            label="Deskripsi"
            size="lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
