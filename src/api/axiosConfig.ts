import { StudentId } from "api/apiTypes";
import axios from "axios";
import {
  ColumnsResponse,
  StudensResponse,
  StudentsVisitRate,
} from "./apiTypes";
import { toast } from "react-toastify";

const URL = "http://94.131.246.109:5555/";

export const instance = axios.create({ baseURL: URL });

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      toast.error(error.response.data);
    }
    if (error.response.status === 500) {
      toast.error("Something went wrong!");
    }
    return error;
  }
);

export const tableAPI = {
  async fetchStudents() {
    const resp = await instance.get<StudensResponse>(`/v1/2/Schoolboy`);
    return resp.data;
  },
  async fetchColumns() {
    const resp = await instance.get<ColumnsResponse>(`/v1/2/Column`);
    return resp.data;
  },
  async fetchStudentVisitRate() {
    const resp = await instance.get<StudentsVisitRate>(`/v1/2/Rate`);
    return resp.data;
  },
  async fetchStudentVisitRateById(id?: number) {
    const resp = await instance.get<StudentsVisitRate>(
      `/v1/2/Rate?SchoolboyId=${id}`
    );
    return resp.data;
  },
  async fetchSetStudentRate(data: StudentId) {
    const resp = await instance.post<StudentId>(`/v1/2/Rate`, data);
    return resp;
  },
  async fetchRemoveStudentRate(data: StudentId) {
    const resp = await instance.post<StudentId>(`/v1/2/UnRate`, data);
    return resp;
  },
};
