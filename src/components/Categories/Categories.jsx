export default function Categories({ categories }) {
  return (
    <div className="md:w-1/5 w-full hidden md:block mr-12">
      <h1 className="font-mainFont mb-8 font-extrabold">Book Categories</h1>
      <ul className="text-sm font-extralight">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between mb-2 font-thin capitalize"
          >
            {category.name}
            <span className="flex justify-center w-12 items-center text-xs font-thin rounded-full border-[1px] border-[#D0C9C0] px-2 ease-out duration-300 hover:bg-mainColor hover:text-white">
              {category.numOfBooks}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
