import Logo from "./Logo.jsx";
import Buttons from "./Buttons.jsx";
import SearchBar from "./SearchBar.jsx";
import { useState } from "react";
import { SearchResultsList } from "./SearchResultsList.jsx";
export default function Header() {
  const [results,setResults]=useState([]);
  const[input,setInput]=useState("");

  
  return (
    <>
    <header className="flex justify-between items-center p-4">
      <Logo />
      <SearchBar setResults={setResults} results={results} input={input} setInput={setInput}/>
      <Buttons />
    </header>
    </>
    
  );
}
