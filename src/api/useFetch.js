import { useState, useCallback } from "react";
import axios from "axios";

const useFetch = (url, method = "GET", data = null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      };

      const response =
        method.toUpperCase() === "GET"
          ? await axios.get(url, config)
          : await axios[method.toLowerCase()](url, data, config);

      setResponseData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, data]);

  return { execute, loading, error, responseData };
};

export default useFetch;
