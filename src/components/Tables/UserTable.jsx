import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Spinner } from "@material-tailwind/react";
import AlertComponent from "../AlertComponent";
import Swal from "sweetalert2";
import UserService from "../../services/service/UserService";

const UserTable = ({ searchQuery, onEdit }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "no", headerName: "No", width: 50 },
    { field: "name", headerName: "Nama ", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Telepon", width: 170 },
    { field: "address", headerName: "Alamat", width: 150 },
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
      const response = await UserService.getUsersByModule();

      if (response.data.success) {
        const fetchedData = response.data.data.users.map((data, index) => ({
          id: data.guid,
          no: index + 1,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
        }));
        setUsers(fetchedData); // Simpan data ke state `users`
      } 
    } catch (error) {
      AlertComponent.Error("Error fetching Users");
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
          const response = await UserService.deleteUser(id);
          if (response.data.success) {
            AlertComponent.SuccessResponse(response.data.message);
            getAllData(); // Pastikan `getAllData` dipanggil tanpa spasi tambahan
          } else {
            AlertComponent.Error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          AlertComponent.Error("Error deleting users", error.message);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const filteredDatas = users.filter((user) => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
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

export default UserTable;
