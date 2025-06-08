export default function Reports(props) {
    return(
        <div>
            <p>Date: {props.date}</p>
            <p>FilePath: {props.filePath}</p>
            <button>View File</button>
        </div>
    )
}