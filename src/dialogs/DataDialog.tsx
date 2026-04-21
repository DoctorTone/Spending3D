import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  DataGrid,
  useGridApiRef,
  type GridCellParams,
  type GridColDef,
} from "@mui/x-data-grid";
import useStore, { CATEGORIES, type SpendingEntry } from "../state/store";

const baseColDef: Partial<GridColDef> = {
  sortable: false,
  filterable: false,
  hideable: false,
  disableColumnMenu: true,
};

const columns: GridColDef[] = [
  { ...baseColDef, field: "date", headerName: "Date", flex: 1 },
  { ...baseColDef, field: "description", headerName: "Description", flex: 2 },
  {
    ...baseColDef,
    field: "amount",
    headerName: "Amount",
    type: "number",
    flex: 1,
  },
  {
    ...baseColDef,
    field: "category",
    headerName: "Category",
    type: "singleSelect",
    valueOptions: [...CATEGORIES],
    editable: true,
    flex: 1,
  },
  {
    ...baseColDef,
    field: "include",
    headerName: "Included",
    type: "boolean",
    editable: true,
    flex: 0.6,
  },
];

const parseDate = (d: string) => {
  const [day, month, year] = d.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
};

type Row = SpendingEntry & { id: number };

const DataDialog = () => {
  const dataDialogOpen = useStore((state) => state.dataDialogOpen);
  const setShowDataDialog = useStore((state) => state.setShowDataDialog);
  const spendingData = useStore((state) => state.spendingData);
  const updateSpendingEntry = useStore((state) => state.updateSpendingEntry);
  const apiRef = useGridApiRef();

  const handleClose = () => {
    setShowDataDialog(false);
  };

  const handleCellClick = (params: GridCellParams) => {
    if (!params.isEditable) return;
    const cellMode = apiRef.current?.getCellMode(params.id, params.field);
    if (cellMode === "edit") return;
    apiRef.current?.startCellEditMode({ id: params.id, field: params.field });
  };

  const rows: Row[] = spendingData
    .map((entry, index) => ({ id: index, ...entry }))
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));

  const processRowUpdate = (newRow: Row, oldRow: Row) => {
    const { id, ...entry } = newRow;
    void oldRow;
    updateSpendingEntry(id, entry);
    return newRow;
  };

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
            apiRef={apiRef}
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            onCellClick={handleCellClick}
            processRowUpdate={processRowUpdate}
            sx={{
              color: "#222222",
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#333333",
                color: "#ffffff",
              },
              "& .MuiDataGrid-cell": {
                color: "#222222",
                borderColor: "rgba(0, 0, 0, 0.1)",
              },
              "& .MuiDataGrid-footerContainer": {
                color: "#222222",
              },
              "& .MuiTablePagination-root": {
                color: "#222222",
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
