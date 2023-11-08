import { Data } from "../types/data";

export const getAnalytics = async () => {
  const response = await fetch("http://localhost:5173/api/users/1/analytics");
  const data = await response.json();
  return data as Data[];
};
