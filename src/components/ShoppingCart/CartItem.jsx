import GrokkingImg from "../../../public/GrokkingAlgoBook.png";
export default function CartItem() {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm  md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-start md:gap-10 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img className="h-28 w-20" src={GrokkingImg} alt="imac image" />
        </a>

        <div className="w-full min-w-0 flex-1 space-y-8 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-medium text-gray-900 hover:underline"
          >
            Grokking Algorithms
          </a>

          {/* Add to Favourite Button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              Add to Favorites
            </button>

            {/* Remove Button */}
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium hover:underline text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
