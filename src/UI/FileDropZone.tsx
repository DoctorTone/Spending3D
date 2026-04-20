import { useState, DragEvent, ChangeEvent, useRef } from "react";
import Papa from "papaparse";
import useStore, { type SpendingEntry } from "../state/store";

type CsvRow = [string, string, string];

const FileDropZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setSpendingData = useStore((state) => state.setSpendingData);
  const setShowDataDialog = useStore((state) => state.setShowDataDialog);
  const spendingData = useStore((state) => state.spendingData);

  const parseFile = (file: File) => {
    Papa.parse<CsvRow>(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        // DEBUG
        console.log("Results = ", results);
        const entries: SpendingEntry[] = results.data
          .map(([date, description, amount]) => ({
            date: date?.trim() ?? "",
            description: description?.trim() ?? "",
            amount: Number(amount),
          }))
          .filter(
            (entry) =>
              entry.date !== "" &&
              entry.description !== "" &&
              Number.isFinite(entry.amount),
          );

        if (entries.length === 0) {
          setError("No valid rows found in CSV");
          return;
        }

        setSpendingData(entries);
        setError(null);
        setFileName(file.name);
        setShowDataDialog(true);
      },
      error: (err) => {
        setError(`Parse error: ${err.message}`);
      },
    });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a .csv file");
      return;
    }
    setError(null);
    parseFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  if (spendingData.length > 0) return null;

  return (
    <div
      id="file-drop-zone"
      className={`panel drop-zone${isDragging ? " dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <p>
        {error
          ? error
          : fileName
            ? `Loaded: ${fileName}`
            : "Drop a .csv file here, or click to browse"}
      </p>
    </div>
  );
};

export default FileDropZone;
