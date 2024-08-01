import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import { Link } from "react-router-dom";
import StudentList from "./StudentList";

const StudentView = () => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  if (students === undefined) return;
  return (
    <div>
      <h1>Student View</h1>
      <Link to="/add-students">Add Students</Link>
      {error && <p>{error}</p>}
      {status === "loading" && <p>Loading...</p>}
      <ul>
        {students.map((student) => (
          <StudentList key={student._id} student={student} />
        ))}
      </ul>
    </div>
  );
};

export default StudentView;
