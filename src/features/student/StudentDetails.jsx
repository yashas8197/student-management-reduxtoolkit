import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteStudentAsync } from "./studentsSlice";

const StudentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { students, status, error } = useSelector((state) => state.students);

  const studentData = students.find((student) => student._id === studentId);

  const handleDeleteStudent = (studentId) => {
    navigate("/");
    dispatch(deleteStudentAsync(studentId));
  };

  return (
    <>
      {studentData && (
        <div>
          <h1>Student Details</h1>
          {status === "pending" && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <p>Name: {studentData.name}</p>
          <p>Age: {studentData.age}</p>
          <p>Grade: {studentData.grade}</p>
          <p>Gender: {studentData.gender}</p>
          <p>
            Attendance:{" "}
            {studentData.attendance ? studentData.attendance : "Unknown"}
          </p>
          <p>Marks: {studentData.marks ? studentData.marks : "Unknown"}</p>
          <Link to="/add-students" state={studentData}>
            Edit
          </Link>
          <button onClick={() => handleDeleteStudent(studentData._id)}>
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default StudentDetails;
