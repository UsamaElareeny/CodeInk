import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../../redux/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Order() {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector(state => state.order);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortColumn, setSortColumn] = useState('orderDate');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchOrders());
        }
    }, [status, dispatch]);

    const totalPages = Math.ceil(orders.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;

    // Sorting Data Logic
    const sortedOrders = [...orders].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
            return 0; // Handle any other type of comparison, if needed
        }
    });

    // Paginated Data
    const visibleOrders = sortedOrders.slice(startIndex, startIndex + rowsPerPage);

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
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="relative">
                <h1 className="text-lg font-bold text-gray-800">Orders</h1>
                <p className="text-sm text-gray-500 px-2">
                    Explore the comprehensive list of all orders, showcasing Buyer Data, Payment Status, Total Price, and Delivery Method.
                </p>
                {status === 'loading' && <div>Loading...</div>}
                {status === 'failed' && <div>{error}</div>}

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
                        <option value="id">ID</option>
                        <option value="buyerEmail">Buyer Email</option>
                        <option value="orderDate">Order Date</option>
                        <option value="paymentStatus">Payment Status</option>
                        <option value="shippingAddress">Shipping Address</option>
                        <option value="deliveryMethod">Delivery Method</option>
                        <option value="total">Total</option>
                    </select>
                    <button
                        onClick={toggleSortOrder}
                        className="px-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>

                <div className="overflow-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 text-gray-600 text-sm font-medium">
                            <tr>
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Buyer Email</th>
                                <th className="px-6 py-3 text-left">Order Date</th>
                                <th className="px-6 py-3 text-left">Payment Status</th>
                                <th className="px-6 py-3 text-left">Shipping Address</th>
                                <th className="px-6 py-3 text-left">Delivery Method</th>
                                <th className="px-6 py-3 text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
                            {visibleOrders && visibleOrders.length > 0 ? (
                                visibleOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-3">{order.id}</td>
                                        <td className="px-6 py-3">{order.buyerEmail}</td>
                                        <td className="px-6 py-3">{new Date(order.orderDate).toLocaleString()}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${order.paymentStatus === 'Pending' ? 'bg-gray-200 text-gray-600' : order.paymentStatus === 'PaymentFailed' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">{`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}, ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postalCode}`}</td>
                                        <td className="px-6 py-3">{order.deliveryMethod}</td>
                                        <td className="px-6 py-3">{order.total}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-3 text-center">No orders found</td>
                                </tr>
                            )}
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
        </div>

    );
}