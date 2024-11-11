import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

export const UpdateUser = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
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
            label="Nama Device"
            size="lg"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            crossOrigin={undefined}
            required
          />
          <Input
            label="Latitude"
            size="lg"
            // value={latitude}
            // onChange={(e) => setLatitude(parseFloat(e.target.value))}
            crossOrigin={undefined}
            required
          />
          <Input
            label="Longitude"
            size="lg"
            // value={longitude}
            // onChange={(e) => setLongitude(parseFloat(e.target.value))}
            crossOrigin={undefined}
            required
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="filled"
            className="bg-main flex justify-center items-center"
            // onClick={handleSave}
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
