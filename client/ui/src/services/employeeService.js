import axios from "axios";

export const getEmployees = async () => {
  return await axios.get("http://localhost:3000/employees");
};
export const addEmployee = async (details) => {
  return await axios.post("http://localhost:3000/employees", details);
};
