import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { Context as AuthContext } from "../context/AuthContext";

const usePaginatedFetch = (
  url,
  value,
  navigation = null,
  limit = 10,
  params = {},
  dependencies = []
) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (navigation) {
      const unsubscribe = navigation.addListener("focus", () => {
        fetchData();
      });
      return unsubscribe;
    } else {
      fetchData();
    }
  }, [currentPage, navigation, ...dependencies]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url, {
        params: {
          ...params,
          page: currentPage,
          limit,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      console.log("response", response.data.data[value]);
      setData((prevData) =>
        currentPage === 1
          ? response.data.data[value]
          : [...prevData, ...response.data.data[value]]
      );

      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  return {
    data,
    isLoading,
    handleLoadMore,
  };
};

export default usePaginatedFetch;
