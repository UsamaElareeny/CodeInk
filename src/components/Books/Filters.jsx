export default function Filters() {
  return (
    <div className="px-4 mb-4 flex flex-row justify-between items-center">
      <div className="results-text text-gray-700 text-xs md:text-base">
        Showing 1-12 of {11176} results
      </div>
      <div className="w-full md:w-auto lg:w-1/4">
        <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-mainColor">
          <option selected="selected">Sort by popularity</option>
          <option>Sort by latest</option>
          <option>Sort by price: low to high</option>
          <option>Sort by price: high to low</option>
        </select>
      </div>
    </div>
  );
}
