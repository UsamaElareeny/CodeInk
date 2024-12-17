import Logo from "./Logo.jsx";
import Buttons from "./Buttons.jsx";
import SearchBar from "./SearchBar.jsx";
export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <Logo />
      <SearchBar />
      <Buttons />
    </header>
  );
}
