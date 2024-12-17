export default function Modal(props) {
    const {
        selectedBook,
        formData,
        handleChange,
        handleSave,
        setSelectedBook,
        setFormData,
        handleDelete
    } = props;

    return (
        <>
            {(selectedBook || formData) && (
                <div
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 id="modal-title" className="text-lg font-bold mb-4">
                            {selectedBook ? "Edit Book" : "Add Book"}
                        </h3>
                        <p id="modal-description" className="sr-only">
                            Fill out the form below to add or edit a book.
                        </p>
                        <form onSubmit={handleSave}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Author
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Genre
                                </label>
                                <input
                                    type="text"
                                    name="genre"
                                    value={formData.genre || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Publication Year
                                </label>
                                <input
                                    type="number"
                                    name="publicationYear"
                                    value={formData.publicationYear || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Cover Upload */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Upload Cover
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                setFormData({ ...formData, cover: reader.result });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                />
                                {formData.cover && (
                                    <img
                                        src={formData.cover}
                                        alt="Cover Preview"
                                        className="mt-2 w-20 h-20 object-cover rounded-md"
                                    />
                                )}
                            </div>

                            {/* Status Toggle */}
                            <div className="mb-4">
                                <div className="flex items-center">
                                    <span className="mr-2 text-gray-700">Available</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                status:
                                                    formData.status === "Available"
                                                        ? "Checked Out"
                                                        : "Available",
                                            })
                                        }
                                        className={`relative w-10 h-6 rounded-full shadow-inner transition ${
                                            formData.status === "Available"
                                                ? "bg-green-500"
                                                : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition ${
                                                formData.status === "Available" ? "translate-x-4" : ""
                                            }`}
                                        ></span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                {selectedBook && (
                                    <button
                                        type="button"
                                        onClick={()=>handleDelete(selectedBook.id)}
                                        className="mr-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedBook(null);
                                        setFormData(null);
                                    }}
                                    className="mr-4 bg-gray-300 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
