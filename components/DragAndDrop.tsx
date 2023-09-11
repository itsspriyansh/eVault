import DropFileInput from './DropFileInput';

function DragAndDrop(){

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <div className = "mainContainer">
        <div className="box">
            <h2 className="header">
                React drop files input
            </h2>
            {/* @ts-ignore */}
            <DropFileInput
                onFileChange={(files) => {
                    //@ts-ignore
                    onFileChange(files)
                }}
            />
        </div>
        </div>
    );
}

export default DragAndDrop;