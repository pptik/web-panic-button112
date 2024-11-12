import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Spinner, Tooltip } from "@material-tailwind/react";
import AlertComponent from "../AlertComponent";
import Swal from "sweetalert2";
import CaseService from "../../services/service/CaseService";
import { FaPowerOff } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import TransactionService from "../../services/service/TransactionService";
import { GetGuidCompany } from "../../helpers/AuthHeaders";

const OPDAnnouncementTable = ({
  searchQuery,
  onEdit,
  page,
  limit,
  status,
  onPageChange,
  onPageSizeChange,
  handled,
  onStatusChange,
}) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [handle, setHandle] = useState(handled);

  const columns = [
    { field: "no", headerName: "No", width: 50 },
    { field: "sender", headerName: "Nama Pengirim", width: 160 },
    { field: "description", headerName: "Deskripsi", width: 240 },
    { field: "address", headerName: "Alamat", width: 130 },
    { field: "status", headerName: "Status", width: 230 },
    {
      field: "actions",
      headerName: "Aksi",
      width: 260,
      renderCell: (params) => (
        <>
          <Tooltip content="Hapus">
            <IconButton
              size="sm"
              className="bg-main mx-1"
              onClick={() => handleDelete(params.id)}
            >
              <MdDelete />
            </IconButton>
          </Tooltip>
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
          <Tooltip content="Terima Kasus">
            <IconButton
              size="sm"
              className="bg-main mx-1"
              onClick={() => handleCaseStatus(params.row.guid)}
            >
              <FiSend />
            </IconButton>
          </Tooltip>
          <Tooltip content="Edit">
            <IconButton
              size="sm"
              className="bg-yellow mx-1"
              onClick={() => onEdit(params.row)}
            >
              <FaEdit />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

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

  const handleCaseStatus = (id) => {
    Swal.fire({
      title: "Apakah anda yakin menerima kasus ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FFD245",
      cancelButtonColor: "#FF4545",
      confirmButtonText: "Terima",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await TransactionService.ChangeStatusHandling(id);
          if (response.data.status) {
            AlertComponent.SuccessResponse(response.data.message);
            onStatusChange("Dalam Penanganan");
            setInterval(() => {
              window.location.reload();
            }, 2000);
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

  const getAllData = async () => {
    if (status === "Dalam Penanganan" || status === "Selesai") {
      setHandle(true);
    }
    let data = {
      page: page + 1, // Adjust if your backend expects 1-based index
      limit,
      guidOpd: GetGuidCompany(),
      isHandled: handle,
      status,
    };
    try {
      const response = await TransactionService.GetTransactionOpd(data);
      if (response.data.status) {
        const fetchedData = response.data.data.map((data, index) => ({
          id: data.guidCase,
          guid: data.guid,
          no: index + 1,
          sender: data.sender,
          description: data.description,
          address: data.address,
          status: data.status,
        }));
        setCases(fetchedData);
      }
    } catch (error) {
      AlertComponent.Error("Error fetching cases");
    }
  };

  useEffect(() => {
    getAllData();
  }, [page, limit, status, handled]);

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

  const filteredDatas = cases.filter((caseData) => {
    if (!caseData.sender) return true;
    return caseData.sender.toLowerCase().includes(searchQuery.toLowerCase());
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
          paginationModel={{ page, pageSize: limit }}
          onPaginationModelChange={(model) => {
            onPageChange(model.page);
            onPageSizeChange(model.pageSize);
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

export default OPDAnnouncementTable;
