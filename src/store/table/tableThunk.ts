import { StudentId } from "./../../api/apiTypes";
import { tableAPI } from "../../api/axiosConfig";
import { AppThunk } from "../store";
import {
  changeStudentRate,
  getStudentsData,
} from "./studentSlice";
import { getColumns } from "./tableSlice";
import { toast } from "react-toastify";

enum StudentsRateStatuses {
  OK = "OK",
}

export const fetchColumns = (): AppThunk => async (dispatch) => {
  try {
    const resp = await tableAPI.fetchColumns();
    if (resp) {
      dispatch(getColumns(resp));
    }
  } catch (e) {
    console.error(e);
  }
};

export const fetchStudentsData = (): AppThunk => async (dispatch) => {
  try {
    const studentsResponse = await tableAPI.fetchStudents();
    const rateResponse = await tableAPI.fetchStudentVisitRate();

    if (studentsResponse && rateResponse) {
      dispatch(
        getStudentsData({
          students: studentsResponse?.Items,
          rates: rateResponse?.Items,
        })
      );
    }
  } catch (e) {
    console.error(e);
  }
};

export const addStudentRateValue =
  (data: StudentId): AppThunk =>
  async (dispatch, getState) => {
    try {
      const addStudentRateResponse = await tableAPI.fetchSetStudentRate(data);
      if (addStudentRateResponse.statusText === StudentsRateStatuses.OK) {
        const studentRateResponse = await tableAPI.fetchStudentVisitRateById(
          data.SchoolboyId
        );
        const singleStudentRate = studentRateResponse.Items.find(
          ({ ColumnId }) => ColumnId === data.ColumnId
        );

        if (singleStudentRate) {
          const studentRates = getState().student.rates || [];
          const rates = [...studentRates, singleStudentRate];
          dispatch(changeStudentRate(rates));

        }
      } else {
        toast.error("Student data didn't update!");
      }
    } catch (e) {
      console.error(e);
    }
  };

export const removeStudentRateValue =
  (data: StudentId): AppThunk =>
  async (dispatch, getState) => {
    try {
      const removeStudentRateResponse = await tableAPI.fetchRemoveStudentRate(
        data
      );

      if (removeStudentRateResponse.statusText === StudentsRateStatuses.OK) {
        const studentRates = getState().student.rates || [];
        if (studentRates) {
          const newRates = studentRates.filter(({ Id }) => Id !== data.Id);
          dispatch(changeStudentRate(newRates));
        }
      } else {
        toast.error("Student data didn't update!");
      }
    } catch (e) {
      console.error(e);
    }
  };
