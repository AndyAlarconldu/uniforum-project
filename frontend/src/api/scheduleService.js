import axios from "axios";

const API_URL = "http://3.211.89.67/api/schedules";

export const getSchedulesByCourse = async (course_id) => {
  const res = await axios.get(`${API_URL}/by-course?course_id=${course_id}`);
  return res.data;
};

export const createSchedule = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};
