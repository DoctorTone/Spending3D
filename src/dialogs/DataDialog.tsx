import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import useStore from "../state/store";

const columns: GridColDef[] = [
  { field: "date", headerName: "Date", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    flex: 1,
  },
];

const DataDialog = () => {
  const dataDialogOpen = useStore((state) => state.dataDialogOpen);
  const setShowDataDialog = useStore((state) => state.setShowDataDialog);
  const spendingData = useStore((state) => state.spendingData);

  const handleClose = () => {
    setShowDataDialog(false);
  };

  const rows = spendingData.map((entry, index) => ({ id: index, ...entry }));

  return (
    <Dialog
      onClose={handleClose}
      open={dataDialogOpen}
      maxWidth={"md"}
      fullWidth={true}
      slotProps={{
        paper: {
          sx: {
            opacity: 0.9,
            backgroundColor: "#222222",
            color: "#cccccc",
            borderRadius: "30px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          },
        },
      }}
    >
      <DialogTitle>Spending Data</DialogTitle>
      <DialogContent dividers>
        <div style={{ width: "100%", height: 420 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            sx={{
              color: "#cccccc",
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#333333",
                color: "#ffffff",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "rgba(255, 255, 255, 0.1)",
              },
              "& .MuiDataGrid-footerContainer": {
                color: "#cccccc",
              },
              "& .MuiTablePagination-root": {
                color: "#cccccc",
              },
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} sx={{ mr: 1, mb: 1 }}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataDialog;
