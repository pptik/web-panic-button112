import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Spinner } from "@material-tailwind/react";
import AlertComponent from "../AlertComponent";
import Swal from "sweetalert2";
import OPDService from "../../services/service/OPDService";

const OPDTable = ({ searchQuery, onEdit }) => {
  const [opds, setOpds] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "no", headerName: "No", width: 50 },
    { field: "name", headerName: "Nama", width: 240 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "address", headerName: "Alamat", width: 240 },
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
  ];

  const getAllData = async () => {
    try {
      const response = await OPDService.GetOPD();
      if (response.data.status) {
        const fetchedData = response.data.data.map((data, index) => ({
          id: data.guid,
          no: index + 1,
          name: data.name,
          email: data.email,
          address: data.address,
        }));
        setOpds(fetchedData);
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
          const response = await OPDService.DeleteOPD(id);
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

  const filteredDatas = opds.filter((opd) => {
    if (!opd.name) return true; // If no location, include in filtered results
    return opd.name.toLowerCase().includes(searchQuery.toLowerCase());
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

export default OPDTable;
