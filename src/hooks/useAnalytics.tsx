import { useEffect, useState } from "react";
import { Data } from "../types/data";
import { getAnalytics } from "../services/getAnalytice";

export const useAnalytics = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    getAnalytics().then((data) => setData(data));
  }, []);

  return { data, setData };
};
