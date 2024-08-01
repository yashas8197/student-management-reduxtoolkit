import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addStudentsAsync = createAsyncThunk(
  "student/addStudents",
  async (formData) => {
    const response = await axios.post(
      "https://07648c9b-1591-4241-b974-f727e4455df0-00-28b8z27krot8c.riker.replit.dev/students",
      formData,
    );

    return response.data;
  },
);

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://07648c9b-1591-4241-b974-f727e4455df0-00-28b8z27krot8c.riker.replit.dev/students",
    );

    return response.data;
  },
);

export const deleteStudentAsync = createAsyncThunk(
  "student/deleteStudents",
  async (id) => {
    const response = await axios.delete(
      `https://07648c9b-1591-4241-b974-f727e4455df0-00-28b8z27krot8c.riker.replit.dev/students/${id}`,
    );

    return response.data;
  },
);

export const updateStudentAsync = createAsyncThunk(
  "student/updateStudent",
  async ({ id, studentData }) => {
    const response = await axios.put(
      `https://07648c9b-1591-4241-b974-f727e4455df0-00-28b8z27krot8c.riker.replit.dev/students/${id}`,
      studentData,
    );

    return response.data;
  },
);

export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    filter: "All",
    sortBy: "name",
    status: "idle",
    error: null,
    filter: "all",
    sortBy: "name",
    schoolStats: {
      totalStudents: 0,
      averageAttendance: 0,
      averageMarks: 0,
      topStudent: null,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    setSchoolStats: (state, action) => {
      state.schoolStats = action.payload;
    },
    setTopStudent: (state, action) => {
      state.schoolStats.topStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    builder.addCase(addStudentsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addStudentsAsync.fulfilled, (state, action) => {
      (state.status = "success"), state.students.push(action.payload);
    });
    builder.addCase(addStudentsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    builder.addCase(deleteStudentAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.students.filter((student) => student._id === action.payload);
    });
    builder.addCase(deleteStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    builder.addCase(updateStudentAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      (state.status = "success"),
        (state.students = state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student,
        ));
    });
    builder.addCase(updateStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { setFilter, setSortBy, setSchoolStats, setTopStudent } =
  studentsSlice.actions;

export default studentsSlice.reducer;
