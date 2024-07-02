import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { Context as AuthContext } from "../context/AuthContext";

const usePaginatedFetch = (url, value) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const reFetchData = useCallback(() => {
    setData([]);
    setCurrentPage(1);
    fetchData();
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url, {
        params: {
          page: currentPage,
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      setData((prevData) => [
        ...prevData,
        ...response.data.data[value].filter(
          (item) => !prevData.find((prevItem) => prevItem._id === item._id)
        ),
      ]);

      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, state.token, url, value]);

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  return {
    data,
    isLoading,
    handleLoadMore,
    reFetchData,
  };
};

export default usePaginatedFetch;
