// hooks/usePagination.js
import { useState, useMemo, useCallback } from "react";

export const usePagination = (items) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const hasNextPage = useMemo(
    () => currentPage < totalPages,
    [currentPage, totalPages]
  );
  const hasPreviousPage = useMemo(() => currentPage > 1, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (hasNextPage) setCurrentPage((prevPage) => prevPage + 1);
  }, [hasNextPage]);

  const handlePreviousPage = useCallback(() => {
    if (hasPreviousPage) setCurrentPage((prevPage) => prevPage - 1);
  }, [hasPreviousPage]);

  return {
    currentItems,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    handleNextPage,
    handlePreviousPage,
  };
};
