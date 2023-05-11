import axios from "axios";

export const getCoronas = async () => {
  return await axios.get("http://localhost:3000/coronainfos");
};
export const addCorona = async (details) => {
  return await axios.post("http://localhost:3000/coronainfos", details);
};
export const getCoronaByTz = async (tz) => {
    return await axios.get("http://localhost:3000/coronainfos/:tz",tz);
  };
