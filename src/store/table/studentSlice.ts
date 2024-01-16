import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Student, StudentId } from "api/apiTypes";

type StudentData = {
  students: Student[] | null;
  rates: StudentId[] | null;
  loading: boolean;
};

const initialState: StudentData = {
  students: null,
  rates: null,
  loading: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    getStudentsData: (
      state,
      action: PayloadAction<{
        students: Student[];
        rates: StudentId[];
      }>
    ) => {
      state.students = action.payload.students;
      state.rates = action.payload.rates;
    },
    changeStudentRate: (state, action: PayloadAction<StudentId[]>) => {
      if (state.rates) {
        state.rates = action.payload;
      }
    },
  },
});

const getStudentsStore = (state: RootState) => state.student;

export const selectStudentsData = createSelector(getStudentsStore, (state) => {
  if (state.students) {
    const studentsData = state.students?.map((student, index) => {
      const rateData = state.rates?.filter(
        ({ SchoolboyId }) => SchoolboyId === student.Id
      );
      const studentName = `${
        student.LastName != null ? student.LastName : ""
      } ${student.FirstName != null ? student.FirstName : ""} ${
        student.SecondName != null ? student.SecondName : ""
      }`;

      return {
        Title: studentName,
        id: student.Id,
        Rate: rateData,
      };
    });
    return studentsData;
  }
  return state.students;
});

export const { getStudentsData, changeStudentRate } =
  studentSlice.actions;

export default studentSlice.reducer;
