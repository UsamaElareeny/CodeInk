import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function BookView() {
  const [content, setContent] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState({});

  const category = "Software Engineering";
  const description = "Grokking Algorithms";
  const shippingDelivery =
    "Books are delivered with a shipping company. Delivery duration is 2-4 working days";

  const params = useParams();

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

  useEffect(() => {
    axios
      .get(`http://codeink.runasp.net/api/books/Published/${params.bookId}`)
      .then((response) => {
        console.log(response.data.data);
        setBook(response.data?.data || {});
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setBook({}); // Reset on error
      });
  }, []);

  return (
    <>
      <section>
        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-start justify-center gap-8 items-center">
          {/* Image Section */}
          <div className="md:w-2/6 md:h-auto flex-shrink-0 text-center">
            <img
              src={book.coverImageUrl}
              alt="Book Image"
              className="w-auto h-[480px] object-cover rounded-lg"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-7/10">
            <h1 className="my-4 text-3xl font-extrabold">{book.title}</h1>
            <span className="block mb-4 text-mainColor text-xl font-bold">
              {book.price} EGP
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
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
                      className="w-3 h-3 text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
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
                        // Join category names with a comma
                        const categoryNames = book.categories
                          .map((category) => category.name)
                          .join(", ");
                        setContent(categoryNames); // Set the content to the joined category names
                      }}
                    >
                      Category
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-mainColor hover:border-mainColor"
                      onClick={() => setContent(book.description)}
                    >
                      Description
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-mainColor hover:border-mainColor"
                      onClick={() => setContent(shippingDelivery)}
                    >
                      Shipping & Delivery
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="capitalize mt-8 font-light">{content}</div>
          </div>
        </div>

        <div>
          <h1 className="font-extrabold text-lg mb-8">Related Products</h1>
          <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
            {/* Replace these with real related books */}
            {/* <Book
            title="Grooking Algorithms"
            price="1000"
            // ImgSource={GrokkingAlgoImg}
          />
          <Book
            title="Grooking Algorithms"
            price="1000"
            // ImgSource={GrokkingAlgoImg}
          /> */}
          </div>
        </div>
      </section>
    </>
  );
}
