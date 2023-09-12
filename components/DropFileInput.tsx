import React, { ChangeEvent, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./DropFileInput.module.css";
import { ImageConfig } from "./../config/ImageConfig";
import uploadImg from "./../assets/cloud-upload-regular-240.png";
import axios from 'axios';
import FormData from 'form-data';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DropFileInputProps {
  onFileChange: (files: File[]) => void;
}

const DropFileInput: React.FC<DropFileInputProps> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [pic, setPic] = useState<string | null>(null);
  const [picLoading, setPicLoading] = useState(false);

  const onDragEnter = () => wrapperRef.current!.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current!.classList.remove("dragover");
  const onDrop = () => wrapperRef.current!.classList.remove("dragover");

  const handleFileUpload = async (selectedFile: File) => {
    if (selectedFile) {
      setPicLoading(true);

      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'eVault');
        formData.append('cloud_name', 'dqe0i0gwp');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dqe0i0gwp/image/upload',
          formData
        );

        const fileUrl = response.data.url;
        setPic(fileUrl);
        console.log(fileUrl);
        setPicLoading(false);
      } catch (error) {
        console.error(error);
        setPicLoading(false);
      }
    }
  };

  const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles) {
      const updatedList: File[] = [...fileList, ...Array.from(newFiles)];
      setFileList(updatedList);
      props.onFileChange(updatedList);

      for (let i = 0; i < newFiles.length; i++) {
        handleFileUpload(newFiles[i]);
      }
    }
  };

  const fileRemove = (file: File) => {
    const updatedList: File[] = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className={styles.drop_file_input}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className={styles.drop_file_input__label}>
          <img src={uploadImg.src} alt="" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} multiple={true} />
      </div>
      {picLoading && <div>Loading...</div>}
      {pic && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <p>File Uploaded</p>
        </div>
      )}
      {fileList.length > 0 && (
        <div className={styles.drop_file_preview}>
          {fileList.map((item: File, index: number) => (
            <div key={index} className={styles.drop_file_preview__item}>
              <div className={styles.drop_file_preview__item__icon}>
                {item.type.startsWith("image/") ? (
                  <img
                    src={
                      ImageConfig[item.type.split("/")[1]]?.src ||
                      ImageConfig["default"].src
                    }
                    alt="file"
                  />
                ) : (
                  <i className="far fa-file-alt"></i>
                )}
              </div>
              <div className={styles.drop_file_preview__item__info}>
                <p>{item.name}</p>
                <p>{item.size} bytes</p>
              </div>
              <span
                className={styles.drop_file_preview__item__del}
                onClick={() => fileRemove(item)}
                
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};

export default DropFileInput;
