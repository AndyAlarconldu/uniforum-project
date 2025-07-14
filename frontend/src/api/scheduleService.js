import axios from "axios";

const API_URL = "http://localhost:8012/api/schedules";

export const getSchedulesByCourse = async (course_id) => {
  const res = await axios.get(`${API_URL}/by-course?course_id=${course_id}`);
  return res.data;
};

export const createSchedule = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};
