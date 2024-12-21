import React from 'react';

const Modal = ({ title, formData, handleChange, handleSave, handleClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <form onSubmit={handleSave}>
                    <label className="block mb-2">
                        Name:
                        <input
                            type="text"
                            name="name"
                            className="border border-gray-300 p-2 rounded w-full"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;