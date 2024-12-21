import SearchForm from "./SearchInput";
import Avatar from "./Avatar";

export default function Header(props) {
  const { navigation, user, userNavigation } = props;
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-4 sm:px-6 md:h-16">
      <div className="hidden md:flex items-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {navigation?.length > 0
            ? navigation[0]?.label || "Dashboard"
            : "Dashboard"}
        </h1>
      </div>

      <div
        className="flex items-center space-x-4 my-3"
        style={{ flex: "1", justifyContent: "end" }}
      >
        <SearchForm />
        <Avatar user={user} userNavigation={userNavigation} />
      </div>
    </header>
  );
}
