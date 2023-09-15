import { useContext } from "react";
import DropFileInput from "./DropFileInput";
import axios from "axios";
import { AppContext, GovContext } from "@/context/AppContext";
function DragAndDrop() {


 //@ts-ignore
  const {imgURL,setImgURL}=useContext(GovContext);
  const onFileChange = async(files: File[]): void => {
    const formData = new FormData();

    for (const file of files) {
        formData.append("file", file);
        formData.append("upload_preset", "ecomnext")
    }
    const data = await axios
      .post("https://api.cloudinary.com/v1_1/dt21djrjq/image/upload",
          formData
      )
     console.log(data.data.url)
     setImgURL(data.data.url);

  };

  return (
    <div className="mainContainer">
      <div className="box">
        <h2 className="header">Drop Files Here </h2>
        <DropFileInput
          onFileChange={(files) => {
            onFileChange(files);
          }}
        />
        {imgURL}
      </div>
    </div>
  );
}

export default DragAndDrop;