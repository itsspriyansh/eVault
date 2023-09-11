import DropFileInput from './DropFileInput';

function DragAndDrop(){
    return (
        <div className = "mainContainer">
        <div className="box">
            <h2 className="header">
                React drop files input
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
        </div>
        </div>
    );
}

export default DragAndDrop;

