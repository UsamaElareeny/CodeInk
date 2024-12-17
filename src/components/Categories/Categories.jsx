
export default function Categories({categories}) {
  

  return (
    <div className="md:w-1/5 w-full hidden md:block mr-12">
      <h1 className="font-mainFont mb-8 font-extrabold">Book Categories</h1>
      <ul className="text-sm font-extralight">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between mb-2 font-thin"
          >
            {category.name}
            <span className="flex justify-center items-center text-xs font-thin rounded-full border-[1px] border-[#D0C9C0] px-2 ease-out duration-300 hover:bg-mainColor hover:text-white">
              {category.numOfBooks} {/* Assuming API returns a count of books */}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
