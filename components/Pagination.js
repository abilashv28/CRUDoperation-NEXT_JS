import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <nav aria-label="Page navigation example" className="fixed bottom-0 left-0 w-full bg-gray-800 py-4 z-50">
      <ul className="inline-flex justify-center w-full -space-x-px text-sm">
        <li>
          <button
            onClick={() => handlePageClick(currentPage > 1 ? currentPage - 1 : 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-white border border-e-0 border-gray-100 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageClick(index + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 ? 'bg-blue-700' : ''}`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageClick(currentPage < totalPages ? currentPage + 1 : totalPages)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-100 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
