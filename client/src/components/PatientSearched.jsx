export default function PatientSearched({ id, name, gender, dateOfBirth}) {
    return(
        <div>
            <p>Name: {name}</p>
            <p>Gender: {gender}</p>
            <p>Date of Birth: {dateOfBirth}</p>
            <button>View Record</button>
        </div>
    )
}