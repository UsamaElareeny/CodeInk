export default function OrderSummary() {
  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="text-white space-y-4 rounded-lg border border-gray-200 bg-black p-4 shadow-sm sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          Order Summary
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            {/* Original Price */}
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 text-gray-400">
                Original Price
              </dt>
              <dd className="text-base font-medium text-white">7,592.00 EGP</dd>
            </dl>

            {/* Store Pickup */}
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-400">
                Shipping Costs
              </dt>
              <dd className="text-base font-medium text-white">99 EGP</dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t pt-2 border-gray-700">
            <dt className="text-base font-bold text-white">Total</dt>
            <dd className="text-base font-bold text-white">8,191.00 EGP</dd>
          </dl>
        </div>

        <a
          href="#"
          className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
        >
          Proceed to Checkout
        </a>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <a
            href="#"
            title=""
            className="inline-flex items-center gap-2 text-sm font-medium underline hover:no-underline text-primary-500"
          >
            Continue Shopping
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
