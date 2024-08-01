import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentsAsync, updateStudentAsync } from "./studentsSlice";
import { useLocation, useNavigate } from "react-router-dom";

const StudentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state || {};
  const [formData, setFormData] = useState({
    name: student.name || "",
    age: student.age || "",
    grade: student.grade || "",
    gender: student.gender || "",
    attendance: student.attendance || "",
    marks: student.marks || "",
  });
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (student._id) {
      dispatch(updateStudentAsync({ id: student._id, studentData: formData }));
      navigate(`/student-details/${student._id}`);
    } else {
      dispatch(addStudentsAsync(formData));
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  return (
    <>
      <h1>{!student._id ? "Add Students" : "Update Student"}</h1>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          id="grade"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Gender: </label>{" "}
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male
        </label>{" "}
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />{" "}
          Female
        </label>
        <br />
        <br />
        {student._id && (
          <>
            <input
              type="number"
              id="attendance"
              name="attendance"
              min={10}
              max={100}
              placeholder="Attendance"
              value={formData.attendance}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="number"
              id="marks"
              name="marks"
              min={1}
              max={100}
              value={formData.marks}
              onChange={handleChange}
              placeholder="Marks"
            />
          </>
        )}
        <br />
        <br />
        <button className="btn btn-primary" type="submit">
          {!student._id ? "Add" : "Update"}
        </button>
      </form>
    </>
  );
};

export default StudentForm;
