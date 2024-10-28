import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import OPDService from "../../services/service/OPDService";
import AlertComponent from "../AlertComponent";
import TransactionService from "../../services/service/TransactionService";

const ReportToOpd = ({ isOpen, onClose, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [opds, setOpds] = useState([]);
  const [guid, setGuid] = useState("");
  const [guidCase, setGuidCase] = useState("");
  const [selectedOpds, setSelectedOpds] = useState([]);

  const handleClose = () => {
    onClose();
  };

  const getAllData = async () => {
    try {
      const response = await OPDService.GetOPD();
      if (response.data.status) {
        setOpds(response.data.data);
      }
    } catch (error) {
      AlertComponent.Error("Error fetching data");
    }
  };

  const handleAddOpd = () => {
    if (guid) {
      const selectedOpd = opds.find((opd) => opd.guid === guid);
      if (selectedOpd) {
        setSelectedOpds((prevOpds) => [...prevOpds, selectedOpd]);
      }
      setGuid(""); // Clear selection after adding
    }
  };

  const handleDeleteOpd = (guid) => {
    setSelectedOpds((prevOpds) => prevOpds.filter((opd) => opd.guid !== guid));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload = { opds: selectedOpds.map((opd) => ({ guid: opd.guid })) };
      const response = await TransactionService.AddTransactionBySuperAdmin(guidCase, payload);
      setIsLoading(false);
      setSelectedOpds([]); // Reset selectedOpds after saving
      onClose();
      AlertComponent.SuccessResponse(response.data.message);
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      AlertComponent.Error("Error saving data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    setGuidCase(data);
  }, [data]);

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
          Laporkan Kejadian Kepada OPD
        </h1>
        <h2>Kode Laporan : {guidCase}</h2>
        <div className="flex flex-col gap-3 mt-5">
          <select
            className="border p-2 rounded-md border-main"
            name="guid"
            value={guid}
            onChange={(e) => setGuid(e.target.value)}
          >
            <option value="">Pilih OPD</option>
            {opds.map((com) => (
              <option key={com.guid} value={com.guid}>
                {com.name}
              </option>
            ))}
          </select>
          <Button onClick={handleAddOpd} disabled={!guid} className="bg-yellow">
            Tambah OPD
          </Button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Daftar OPD Terpilih:</h2>
          <ul>
            {selectedOpds.map((opd) => (
              <li key={opd.guid} className="flex justify-between items-center">
                <span>{opd.name}</span>
                <Button
                  variant="text"
                  size="sm"
                  color="red"
                  onClick={() => handleDeleteOpd(opd.guid)}
                >
                  Hapus
                </Button>
              </li>
            ))}
          </ul>
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

export default ReportToOpd;
