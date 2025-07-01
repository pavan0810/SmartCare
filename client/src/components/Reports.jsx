import '../css/reports.css'
export default function Reports(props) {
    function viewReport() {
        props.setFilePath(props.filePath);
    }

    return(
        <div className="reportElement">
            <p>Date: {props.date}</p>
            <button onClick={viewReport}>View File</button>
        </div>
    )
}