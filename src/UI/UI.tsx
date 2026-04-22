import Copyright from "../UI/Copyright";
import DataDialog from "../dialogs/DataDialog";
import Controls from "./Controls";
import FileDropZone from "./FileDropZone";
import Info from "./Info";
import ShowDataButton from "./ShowDataButton";
import Title from "./Title";
import TotalExpenditure from "./TotalExpenditure";

const UI = () => {
  return (
    <>
      <Title />
      <Copyright />
      {/* <Controls /> */}
      <FileDropZone />
      <DataDialog />
      <ShowDataButton />
      <TotalExpenditure />
      {/* <Info /> */}
    </>
  );
};

export default UI;
