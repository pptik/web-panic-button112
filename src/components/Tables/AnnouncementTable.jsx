import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Spinner } from "@material-tailwind/react";
import AlertComponent from "../AlertComponent";
import Swal from "sweetalert2";
import CaseService from "../../services/service/CaseService";

const AnnouncementTable = ({ searchQuery, onEdit }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "no", headerName: "No", width: 50 },
    { field: "sender", headerName: "Nama Pengirim", width: 160 },
    { field: "description", headerName: "Deskripsi", width: 240 },
    { field: "deviceType", headerName: "Tipe Laporan", width: 120 },
    { field: "address", headerName: "Alamat", width: 140 },
    {
      field: "actions",
      headerName: "Aksi",
      width: 260,
      renderCell: (params) => (
        <>
          <Button
            size="sm"
            className="bg-main mx-1"
            onClick={() => handleDelete(params.row.guid)}
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
          <Button
            size="sm"
            className="bg-yellow mx-1"
            onClick={() => onEdit(params.row)}
          >
            Detail
          </Button>
        </>
      ),
    },
  ];

  const getAllData = async () => {
    try {
      const response = await CaseService.GetCase();
      console.log(response.data.data);
      if (response.data.status) {
        const fetchedData = response.data.data.map((data, index) => ({
          id: data.guid,
          no: index + 1,
          sender: data.sender,
          description: data.description,
          deviceType: data.deviceType,
          address: data.address,
        }));
        setCases(fetchedData);
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
          const response = await CaseService.DeleteCase(id);
          if (response.data.status) {
            AlertComponent.SuccessResponse(response.data.message);
            getAllData();
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

  useEffect(() => {
    getAllData();
  }, []);

  const filteredDatas = cases.filter((cases) => {
    if (!cases.sender) return true; // If no location, include in filtered results
    return cases.sender.toLowerCase().includes(searchQuery.toLowerCase());
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
          rows={filteredDatas}
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

export default AnnouncementTable;