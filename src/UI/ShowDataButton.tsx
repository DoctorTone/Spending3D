import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useStore from "../state/store";

const ShowDataButton = () => {
  const spendingData = useStore((state) => state.spendingData);
  const setShowDataDialog = useStore((state) => state.setShowDataDialog);
  const setSpendingData = useStore((state) => state.setSpendingData);
  const setCategoryTotals = useStore((state) => state.setCategoryTotals);

  if (spendingData.length === 0) return null;

  const handleNewData = () => {
    setShowDataDialog(false);
    setSpendingData([]);
    setCategoryTotals({});
  };

  return (
    <div id="show-data" className="panel">
      <Stack spacing={1}>
        <Button variant="contained" onClick={() => setShowDataDialog(true)}>
          Show Data
        </Button>
        <Button variant="contained" onClick={handleNewData}>
          New Data
        </Button>
      </Stack>
    </div>
  );
};

export default ShowDataButton;
