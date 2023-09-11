import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DropFileInput.module.css'
import { ImageConfig } from './../config/ImageConfig'



import uploadImg from './../assets/cloud-upload-regular-240.png';

const DropFileInput = (props: any[]) => {

    const wrapperRef = useRef<HTMLLinkElement>(null);

    const [fileList, setFileList] = useState<any>([]);


    const onDragEnter = () => wrapperRef.current!.classList.add('dragover');


    const onDragLeave = () => wrapperRef.current!.classList.remove('dragover');

    const onDrop = () => wrapperRef.current!.classList.remove('dragover');
    

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList : any [] = [...fileList, newFile];
            //@ts-ignore
            setFileList(updatedList);
            //@ts-ignore
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList: any [] = [...fileList];
        //@ts-ignore
        updatedList.splice(fileList.indexOf(file), 1);
        //@ts-ignore
        setFileList(updatedList);
        //@ts-ignore
        props.onFileChange(updatedList);
    }

    return (
        <>
            <div
                //@ts-ignore
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
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className={styles.drop_file_preview}>
                        <p className={styles.drop_file_preview__title}>
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className={styles.drop_file_preview__item}>
                                    <img src={ImageConfig[item['type'].split('/')[1]].src || ImageConfig['default'].src} alt="kuch to hai" />
                                    <div className={styles.drop_file_preview__item__info}>
                                        <p>{item['name']}</p>
                                        <p>{item['size']}B</p>
                                    </div>
                                    <span className={styles.drop_file_preview__item__del} onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
