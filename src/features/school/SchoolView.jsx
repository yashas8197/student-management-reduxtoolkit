import { useDispatch, useSelector } from "react-redux";
import { setSchoolStats, setTopStudent } from "../student/studentsSlice";
import { useEffect } from "react";

const SchoolView = () => {
  const { students, status, error } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;
      const averageAttendance =
        students.reduce((acc, curr) => acc + curr.attendance, 0) /
        totalStudents;

      const averageMarks =
        students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents;

      const topStudent = students.reduce(
        (top, student) => (student.marks > top.marks ? student : top),
        students[0],
      );

      dispatch(
        setSchoolStats({
          totalStudents,
          averageAttendance: averageAttendance.toFixed(2),
          averageMarks: averageMarks.toFixed(2),
        }),
      );
      dispatch(setTopStudent(topStudent.name));
    }
  }, [students, dispatch]);

  const { totalStudents, averageAttendance, averageMarks } = useSelector(
    (state) => state.students.schoolStats,
  );

  const topStudent = useSelector(
    (state) => state.students.schoolStats.topStudent,
  );

  console.log(students);

  return (
    <div>
      <h1>School View</h1>
      {students && (
        <div>
          <p>Total Students: {totalStudents}</p>
          <p>Average Attandance: {averageAttendance}</p>
          <p>Average Marks: {averageMarks}</p>
          <p>Top Student: {topStudent}</p>
        </div>
      )}
    </div>
  );
};

export default SchoolView;
