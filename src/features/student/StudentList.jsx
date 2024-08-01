import { Link } from "react-router-dom";

const StudentList = ({ student }) => {
  const { name, _id } = student;
  return (
    <>
      <li>
        <Link to={`/student-details/${_id}`}>{name}</Link>
      </li>
    </>
  );
};

export default StudentList;
