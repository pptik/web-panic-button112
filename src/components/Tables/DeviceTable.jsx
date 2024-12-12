import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Spinner } from "@material-tailwind/react";
import AlertComponent from "../AlertComponent";
import Swal from "sweetalert2";
import DeviceService from "../../services/service/DeviceService";

const DeviceTable = ({ searchQuery, onEdit }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "no", headerName: "No", width: 50 },
    { field: "name", headerName: "Nama Perangkat", width: 200 },
    { field: "type", headerName: "Tipe Perangkat", width: 150 },
    { field: "guid", headerName: "GUID Perangkat", width: 150 },
    {
      field: "actions",
      headerName: "Aksi",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            size="sm"
            className="bg-main mx-1"
            onClick={() => handleDelete(params.id)}
          >
            Hapus
          </Button>
          <Button
            size="sm"
            className="bg-yellow mx-1"
            onClick={() => onEdit(params.row)}
          >
            Edit
          </Button>
        </>
      ),
    },
    {
      field: "deviceActions",
      headerName: "Aksi Device",
      width: 220,
      renderCell: (params) => (
        <>
          <Button
            size="sm"
            className="bg-main mx-1"
            onClick={() => HandleOffDevice(params.row)}
          >
            Matikan
          </Button>
          <Button
            variant="outlined"
            size="sm"
            className="border-main text-main mx-1"
            onClick={() => HandleOnDevice(params.row)}
          >
            Aktifkan
          </Button>
        </>
      ),
    },
  ];

  const getAllDevice = async () => {
    try {
      const response = await DeviceService.GetDevice();
      if (response.data.status) {
        const fetchedData = response.data.data.map((data, index) => ({
          id: data.guid,
          no: index + 1,
          name: data.name,
          type: data.type,
          guid: data.guidDevice,
        }));
        setDevices(fetchedData);
      }
    } catch (error) {
      AlertComponent.Error("Error fetching devices");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda tidak akan bisa memulihkan data ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFD245",
      cancelButtonColor: "#FF4545",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await DeviceService.DeleteDevice(id);
          if (response.data.status) {
            AlertComponent.SuccessResponse("Berhasil Menghapus Perangkat");
            getAllDevice();
          } else {
            AlertComponent.Error(response.data.message);
          }
        } catch (error) {
          AlertComponent.Error("Error deleting device", error.message);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const HandleOnDevice = (data) => {
    if (data.type === "Sensor") {
      let status = 0;
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Ingin menyalakan device?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#FFD245",
        cancelButtonColor: "#FF4545",
        confirmButtonText: "Aktifkan",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            const response = await DeviceService.UpdateStatusDevice(
              data.guid,
              status
            );
            if (response.data.status) {
              AlertComponent.SuccessResponse("Berhasil Mengubah Status Perangkat");
              getAllDevice();
            } else {
              AlertComponent.Error(response.data.message);
            }
          } catch (error) {
            AlertComponent.Error("Error deleting device", error.message);
          } finally {
            setLoading(false);
          }
        }
      });
    } else if (data.type === "Aktuator") {
      let status = 1;
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Ingin menyalakan device?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#FFD245",
        cancelButtonColor: "#FF4545",
        confirmButtonText: "Aktifkan",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            const response = await DeviceService.UpdateStatusDevice(
              data.guid,
              status
            );
            if (response.data.status) {
              AlertComponent.SuccessResponse("Berhasil Mengubah Status Perangkat");
              getAllDevice();
            } else {
              AlertComponent.Error(response.data.message);
            }
          } catch (error) {
            AlertComponent.Error("Error deleting device", error.message);
          } finally {
            setLoading(false);
          }
        }
      });
    }
  };

  const HandleOffDevice = (data) => {
    if (data.type === "Sensor") {
      let status = 1;
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Ingin mematikan device?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#FFD245",
        cancelButtonColor: "#FF4545",
        confirmButtonText: "Matikan",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            const response = await DeviceService.UpdateStatusDevice(
              data.guid,
              status
            );
            if (response.data.status) {
              AlertComponent.SuccessResponse("Berhasil Mengubah Status Perangkat");
              getAllDevice();
            } else {
              AlertComponent.Error(response.data.message);
            }
          } catch (error) {
            AlertComponent.Error("Error deleting device", error.message);
          } finally {
            setLoading(false);
          }
        }
      });
    } else if (data.type === "Aktuator") {
      let status = 0;
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Ingin mematikan device?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#FFD245",
        cancelButtonColor: "#FF4545",
        confirmButtonText: "Matikan",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            const response = await DeviceService.UpdateStatusDevice(
              data.guid,
              status
            );
            if (response.data.status) {
              AlertComponent.SuccessResponse("Berhasil Mengubah Status Perangkat");
              getAllDevice();
            } else {
              AlertComponent.Error(response.data.message);
            }
          } catch (error) {
            AlertComponent.Error("Error deleting device", error.message);
          } finally {
            setLoading(false);
          }
        }
      });
    }
  };

  useEffect(() => {
    getAllDevice();
  }, []);

  const filteredDevices = devices.filter((device) => {
    if (!device.name) return true; // If no location, include in filtered results
    return device.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full h-full my-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <DataGrid
          columns={columns}
          rows={filteredDevices}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          disableRowSelectionOnClick
          autoHeight
          getRowClassName={() => "striped-row"}
        />
      )}
    </div>
  );
};

export default DeviceTable;
