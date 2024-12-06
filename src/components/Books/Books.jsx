import Filters from "./Filters.jsx";
import Book from "./Book.jsx";
import bookImage from "../../../public/GrokkingAlgoBook.png";
export default function Books() {
  return (
    <div className="md:w-4/5 w-full">
      <Filters />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 transition-all duration-300 ease-linear">
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
        <Book title="Grokking Algorithms" price="149" ImgSource={bookImage} />
      </div>
    </div>
  );
}
