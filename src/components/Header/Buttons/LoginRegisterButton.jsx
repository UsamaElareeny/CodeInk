export default function LoginRegisterButton() {
  return (
    <button className="h-12 bg-buttonBgColor place-items-center rounded-full flex p-4 focus:outline-none duration-300 hover:opacity-70">
      <i className="fa-regular fa-user" />
      <span className="hidden md:block text-sm transition-all duration-1000">
        Login/Register
      </span>
    </button>
  );
}
