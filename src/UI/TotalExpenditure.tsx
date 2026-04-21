import Typography from "@mui/material/Typography";
import useStore from "../state/store";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TotalExpenditure = () => {
  const categoryTotals = useStore((state) => state.categoryTotals);
  const spendingData = useStore((state) => state.spendingData);
  const total = Object.values(categoryTotals).reduce(
    (sum, amount) => sum + (amount ?? 0),
    0,
  );

  if (total === 0) return null;

  const firstDate = spendingData[0]?.date;
  const [, month, year] = firstDate?.split("/").map(Number) ?? [];
  const monthYear =
    month && year ? `${MONTHS[month - 1]} ${year}` : null;

  return (
    <div id="total-expenditure" className="panel">
      {monthYear && (
        <Typography variant="h6" sx={{ color: "orange" }}>
          {monthYear}
        </Typography>
      )}
      <Typography variant="h6" sx={{ color: "orange" }}>
        Total: £{total.toFixed(2)}
      </Typography>
    </div>
  );
};

export default TotalExpenditure;
