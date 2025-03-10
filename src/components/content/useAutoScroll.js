import { useState, useEffect } from "react";

const useAutoScroll = (totalPages, intervalTime = 3000) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [totalPages, intervalTime]);

  return { currentPage, setCurrentPage };
};

export default useAutoScroll;
