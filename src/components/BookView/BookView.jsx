import Book from "../Books/Book";
import GrokkingAlgoImg from "../../../public/GrokkingAlgoBook.png";
import { useState } from "react";
export default function BookView() {
  const [Content, SetContent] = useState("");
  const [quantity, setQuantity] = useState(1);
  const category = "Software Engineering";
  const description = "Grokking Algorithms";
  const shippingDelivery =
    "Books are delivered with a shipping company. Delivery duration is 2-4 working days";
  const handleIncrement = () => {
    if (quantity < 50) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <section>
      <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-start justify-center gap-8 items-center">
        {/* Image Section */}
        <div className="md:w-2/6 md:h-auto flex-shrink-0 text-center">
          <img
            src={GrokkingAlgoImg}
            alt="Book Image"
            className="w-auto h-[480px] object-cover rounded-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-7/10">
          <h1 className="my-4 text-3xl font-extrabold">Grokking Algorithms</h1>
          <span className="block mb-4 text-mainColor text-xl font-bold">
            1000 EGP
          </span>
          <div className="mb-8 flex justify-center items-center">
            <form className="max-w-xs border border-gray-300 rounded-xl h-11">
              <div className="relative flex items-center max-w-[8rem]">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="rounded-xl p-3 h-full hover:opacity-70"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  value={quantity}
                  className="bg-inherit border-x-0 border-gray-300 h-11 text-center text-sm block w-full"
                  readOnly
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="rounded-xl p-3 h-full hover:opacity-70"
                >
                  <svg
                    class="w-3 h-3 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <button className="text-white bg-mainColor px-6 py-2 font-bold text-center text-sm w-44 mx-auto my-2 rounded-full transition-all duration-500 ease-in-out hover:opacity-70">
              Add to Cart
            </button>
            <button className="text-white bg-black px-6 py-2 font-bold text-center text-sm w-44 mx-auto my-2 rounded-full transition-all duration-500 ease-in-out hover:opacity-70">
              Buy Now
            </button>
          </div>
          <div>
            <div className="text-md font-medium text-center border-b border-gray-200">
              <ul className="flex flex-wrap -mb-px">
                <li>
                  <a
                    href="#"
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-mainColor hover:border-mainColor"
                    onClick={() => {
                      SetContent(category);
                    }}
                  >
                    Category
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-mainColor hover:border-mainColor"
                    onClick={() => {
                      SetContent(description);
                    }}
                  >
                    Description
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-mainColor hover:border-mainColor"
                    onClick={() => {
                      SetContent(shippingDelivery);
                    }}
                  >
                    Shipping & Delivery
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 font-light">{Content}</div>
        </div>
      </div>

      <div>
        <h1 className="font-extrabold text-lg mb-8">Related Products</h1>
        <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          <Book
            title="Grooking Algorithms"
            price="1000"
            ImgSource={GrokkingAlgoImg}
          />
          <Book
            title="Grooking Algorithms"
            price="1000"
            ImgSource={GrokkingAlgoImg}
          />
          <Book
            title="Grooking Algorithms"
            price="1000"
            ImgSource={GrokkingAlgoImg}
          />
          <Book
            title="Grooking Algorithms"
            price="1000"
            ImgSource={GrokkingAlgoImg}
          />
          <Book
            title="Grooking Algorithms"
            price="1000"
            ImgSource={GrokkingAlgoImg}
          />
        </div>
      </div>
    </section>
  );
}
