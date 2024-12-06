export default function Categories() {
  return (
    <div className="md:w-1/5 w-full hidden md:block mr-12">
      <h1 className="font-mainFont mb-8 font-extrabold">Book Categories</h1>
      <ul className="text-sm font-extralight">
        <li className="flex justify-between mb-2 font-thin">
          Software Engineering
          <span className="flex justify-center items-center text-xs font-thin rounded-full border-[1px] border-[#D0C9C0] px-2 ease-out duration-300 hover:bg-mainColor hover:text-white">
            400
          </span>
        </li>
        <li className="flex justify-between mb-2 font-thin">
          Technology
          <span className="flex justify-center items-center text-xs font-thin rounded-full border-[1px] border-[#D0C9C0] px-2 ease-out duration-300 hover:bg-mainColor hover:text-white">
            400
          </span>
        </li>
        <li className="flex justify-between mb-2 font-thin">
          AI & Data Science
          <span className="flex justify-center items-center text-xs font-thin rounded-full border-[1px] border-[#D0C9C0] px-2 ease-out duration-300 hover:bg-mainColor hover:text-white">
            400
          </span>
        </li>
        <li className="flex justify-between mb-2 font-thin">
          Devops & Clouds
          <span className="flex justify-center items-center text-xs font-thin rounded-full border-[1px] border-[#D0C9C0] px-2 ease-out duration-300 hover:bg-mainColor hover:text-white">
            400
          </span>
        </li>
        <li className="flex justify-between mb-2 font-thin">
          Security & Hardware
          <span className="flex justify-center items-center text-xs font-thin rounded-full border-[1px] border-[#D0C9C0] px-2 ease-out duration-300 hover:bg-mainColor hover:text-white">
            400
          </span>
        </li>
        <li className="flex justify-between mb-2 font-thin">
          Creativity
          <span className="flex justify-center items-center text-xs font-thin rounded-full border-[1px] border-[#D0C9C0] px-2 ease-out duration-300 hover:bg-mainColor hover:text-white">
            400
          </span>
        </li>
      </ul>
    </div>
  );
}
