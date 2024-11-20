import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Spinner, IconButton, Tooltip } from "@material-tailwind/react";
import { MdInfo } from "react-icons/md";
import { NavLink } from "react-router-dom";

const ResponseTable = ({ datas = [], onDetail }) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "no", headerName: "No", width: 50 },
    { field: "petugas", headerName: "Petugas", width: 260 },
    { field: "description", headerName: "Deskripsi", width: 240 },
    { field: "status", headerName: "Status", width: 200 },
    { field: "address", headerName: "Alamat", width: 240 },
    {
      field: "actions",
      headerName: "Aksi",
      width: 80,
      renderCell: (params) => (
        <Tooltip content="Detail">
          <IconButton size="sm" className="bg-yellow mx-1" onClick={() => onDetail(params.row)}>
            <MdInfo />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    // Map the incoming datas prop to the format expected by the DataGrid
    const formattedData = datas.map((item, index) => ({
      id: item.guid, // Ensure the `id` field exists for DataGrid row identification
      no: index + 1,
      petugas: item.petugas || "N/A",
      description: item.description || "N/A",
      status: item.status || "N/A",
      address: item.address || "N/A",
      image: item.imageUrl
    }));

    setResponse(formattedData);
  }, [datas]);

  return (
    <div className="w-full h-full my-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <DataGrid
          columns={columns}
          rows={response}
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

export default ResponseTable;
