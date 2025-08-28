import React, { useState } from "react";

const Table = ({ data, columns, handleEdit, handleDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortColumn, setSortColumn] = useState(columns[1]);
    const [sortOrder, setSortOrder] = useState("asc");

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;

    // Sorting Data Logic
    const sortedData = [...data].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (typeof valueA === "string" && typeof valueB === "string") {
            return sortOrder === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        } else if (typeof valueA === "number" && typeof valueB === "number") {
            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        } else {
            return 0; // Handle any other type of comparison, if needed
        }
    });

    // Paginated Data
    const visibleData = sortedData.slice(startIndex, startIndex + rowsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when rows per page changes
    };

    const handleSortColumnChange = (e) => {
        setSortColumn(e.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    if (!data || data.length === 0) {
        return <div className="text-center text-gray-500 py-4">No data available.</div>;
    }

    return (
        <div className="relative">
            {/* Sort By Section */}
            <div className="py-1 mb-4 flex items-center space-x-4">
                <label htmlFor="sortColumn" className="text-sm text-gray-700 font-medium">
                    Sort By:
                </label>
                <select
                    id="sortColumn"
                    value={sortColumn}
                    onChange={handleSortColumnChange}
                    className="block w-auto px-2 py-1 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                >
                    {columns.map((column, index) => (
                        <option key={index} value={column}>
                            {column}
                        </option>
                    ))}
                </select>
                <button
                    onClick={toggleSortOrder}
                    className="px-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                    {sortOrder === "asc" ? "↑" : "↓"}
                </button>
            </div>

            {/* Table */}
            <div className="overflow-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-gray-600 text-sm font-medium">
                        <tr>
                            {columns.map((column, i) => (
                                <th key={i} className="px-6 py-3 text-left">
                                    {column}
                                </th>
                            ))}
                            <th className="px-6 py-3" scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
                        {visibleData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-3">{item.id}</td>
                                <td className="px-6 py-3">{item.name}</td>
                                <td className="px-6 py-3">{item.numOfBooks}</td>
                                <td className="px-6 py-3">{new Date(item.createdOn).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{item.lastUpdatedOn ? new Date(item.lastUpdatedOn).toLocaleDateString() : 'N/A'}</td>
                                <td className="px-6 py-3 text-right">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                >
                    Previous
                </button>

                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                >
                    Next
                </button>
            </div>

            {/* Rows per Page */}
            <div className="mt-4 flex justify-end items-center space-x-2 p-1">
                <label
                    htmlFor="rowsPerPage"
                    className="text-sm text-gray-700 font-medium"
                >
                    Rows per page:
                </label>
                <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="block w-[50px] px-2 py-1 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                >
                    {[5, 10, 15, 20].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Table;