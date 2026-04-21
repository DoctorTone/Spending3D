import Copyright from "../UI/Copyright";
import DataDialog from "../dialogs/DataDialog";
import Controls from "./Controls";
import FileDropZone from "./FileDropZone";
import Info from "./Info";
import TotalExpenditure from "./TotalExpenditure";

const UI = () => {
  return (
    <>
      <Copyright />
      {/* <Controls /> */}
      <FileDropZone />
      <DataDialog />
      <TotalExpenditure />
      {/* <Info /> */}
    </>
  );
};

export default UI;
