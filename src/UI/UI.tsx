import Copyright from "../UI/Copyright";
import DataDialog from "../dialogs/DataDialog";
import Controls from "./Controls";
import FileDropZone from "./FileDropZone";
import Info from "./Info";

const UI = () => {
  return (
    <>
      <Copyright />
      {/* <Controls /> */}
      <FileDropZone />
      <DataDialog />
      {/* <Info /> */}
    </>
  );
};

export default UI;
