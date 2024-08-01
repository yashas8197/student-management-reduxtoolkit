import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "../student/studentsSlice";

const ClassView = () => {
  const { students, filter, sortBy } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  console.log(students);

  const filteredStudents = students.filter((student) => {
    if (filter === "all") return true;
    if (filter === "Male") return student.gender === "Male";
    if (filter === "Female") return student.gender === "Female";
  });

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "marks") {
      return b.marks - a.marks;
    } else if (sortBy === "attendance") {
      return b.attendance - a.attendance;
    }
  });

  return (
    <div>
      <h1>Class View</h1>
      <div>
        <label>Filter by Gender: </label>
        <select onChange={(e) => dispatch(setFilter(e.target.value))}>
          <option value="all">All</option>
          <option value="Male">Boys</option>
          <option value="Female">Girls</option>
        </select>
      </div>
      <br />

      <div>
        <label>Sort by:</label>
        <select onChange={(e) => dispatch(setSortBy(e.target.value))}>
          <option value="name">Name</option>
          <option value="marks">marks</option>
          <option value="attendance">attendance</option>
        </select>
      </div>

      <ul>
        {students.length !== 0 &&
          sortedStudents.map((student) => (
            <li key={student._id}>
              <p>
                {student.name} - {student.gender} - Marks:{" "}
                {student.marks ? student.marks : "Unknown"} - Attendance:{" "}
                {student.attendance ? student.attendance : "Unknown"}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ClassView;
