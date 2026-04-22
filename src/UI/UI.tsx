import Copyright from "../UI/Copyright";
import DataDialog from "../dialogs/DataDialog";
import FileDropZone from "./FileDropZone";
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
