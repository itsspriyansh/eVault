import DropFileInput from "./DropFileInput";

function DragAndDrop() {
  const onFileChange = (files: File[]): void => {
    console.log(files);
  };

  return (
    <div className="mainContainer">
      <div className="box">
        <h2 className="header"> Drop file here</h2>
        <DropFileInput
          onFileChange={(files) => {
            onFileChange(files);
          }}
        />
      </div>
    </div>
  );
}

export default DragAndDrop;