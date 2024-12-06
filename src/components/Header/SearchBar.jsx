export default function SearchBar() {
  return (
    <form className="hidden sm:block relative rounded-full w-full md:w-3/6 md:block border-[1px] border-buttonBgColorHover">
      <input
        type="text"
        placeholder="Search for Books..."
        className="rounded-full outline-none pl-10 w-full h-[42px] md:text-md"
        required
        autoComplete="off"
      />
      <button className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
}
