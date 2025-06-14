import '../css/reports.css'
export default function Reports(props) {
    return(
        <div className="reportElement">
            <p>Date: {props.date}</p>
            <p>FilePath: {props.filePath}</p>
            <button>View File</button>
        </div>
    )
}