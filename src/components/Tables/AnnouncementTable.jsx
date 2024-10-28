import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {  IconButton, Spinner, Tooltip } from "@material-tailwind/react";
import AlertComponent from "../AlertComponent";
import Swal from "sweetalert2";
import CaseService from "../../services/service/CaseService";
import { FaPowerOff } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { MdInfo } from "react-icons/md";

const AnnouncementTable = ({ searchQuery, onEdit }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "no", headerName: "No", width: 50 },
    { field: "sender", headerName: "Nama Pengirim", width: 160 },
    { field: "description", headerName: "Deskripsi", width: 240 },
    { field: "address", headerName: "Alamat", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "actions",
      headerName: "Aksi",
      width: 260,
      renderCell: (params) => (
        <>
          <Tooltip content="Matikan">
            <IconButton
              size="sm"
              className="border-main text-main mx-1"
              variant="outlined"
              onClick={() => TurnOffCase(params.id)}
            >
              <FaPowerOff />
            </IconButton>
          </Tooltip>
          <Tooltip content="Laporkan">
            <IconButton
              size="sm"
              className="bg-main mx-1"
              onClick={() => onEdit(params.id)}
            >
              <FiSend />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const getAllData = async () => {
    try {
      const response = await CaseService.GetCase();
      if (response.data.status) {
        const fetchedData = response.data.data.map((data, index) => ({
          id: data.guid,
          no: index + 1,
          sender: data.sender,
          description: data.description,
          address: data.address,
          status: data.status,
        }));
        setCases(fetchedData);
      }
    } catch (error) {
      AlertComponent.Error("Error fetching devices");
    }
  };

  const TurnOffCase = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan mematikan perangkat ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFD245",
      cancelButtonColor: "#FF4545",
      confirmButtonText: "Matikan",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await CaseService.TurnOffCase(id);
          if (response.data.status) {
            AlertComponent.SuccessResponse(response.data.message);
            getAllData();
          } else {
            AlertComponent.Error(response.data.message);
          }
        } catch (error) {
          console.log(error);

          AlertComponent.Error(error.response.data.message);
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
