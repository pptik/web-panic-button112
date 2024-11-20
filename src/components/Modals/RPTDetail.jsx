import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export const RPTDetail = ({ isOpen, onClose, data }) => {

  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      size="lg"
      className="bg-transparent shadow-none"
    >
      <Card className="flex flex-col">
        <CardBody className="flex flex-col gap-2">
          <Typography variant="h4" color="blue-gray">
            Detail Penanganan
          </Typography>
          <div className="flex gap-5">
              <div className="max-w-[400px]">
                <img src={data.image} alt="Case Image" />
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="font-bold">Nama Petugas</h2>
                  <p>{data.petugas}</p>
                </div>
                <div>
                  <h2 className="font-bold">Alamat</h2>
                  <p>{data.address}</p>
                </div>
                <div>
                  <h2 className="font-bold">Deskripsi</h2>
                  <p>{data.description}</p>
                </div>
                <div>
                  <h2 className="font-bold">Status</h2>
                  <p>{data.status}</p>
                </div>
              </div>
            </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="text" fullWidth onClick={onClose} className="mt-2">
            Batal
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
