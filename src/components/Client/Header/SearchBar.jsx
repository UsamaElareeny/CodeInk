import axios from "axios";
import { useState } from "react";
import { SearchResultsList } from "./SearchResultsList";

export default function SearchBar({setResults,input , setInput,results}) {

  const fetchData=(value)=>{
    if (!value.trim()) {
      setResults([]);
      return;
    }
    let endpoint = "http://codeink.runasp.net/api/books/Published";
    axios
      .get(endpoint)
      .then((response) => {
        const results=response.data.data.items.filter((book)=>{
          return book.title.toLowerCase().includes(value.toLowerCase());
        })
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }
  const handleChange = (value)=>{
    setInput(value);
    fetchData(value);
  }



  return (
    <form className="hidden sm:block relative rounded-full w-full md:w-3/6 md:block border-[1px] border-buttonBgColorHover">
      <input
        type="text"
        placeholder="Search for Books..."
        className="rounded-full outline-none pl-10 w-full h-[42px] md:text-md"
        required
        autoComplete="off"
        value={input}
        onChange={(e)=>handleChange(e.target.value)}
      />
      <button className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <i className="fas fa-search"></i>
      </button>
      
      <SearchResultsList 
        results={results} 
        onClearSearch={() => {
          setInput("");
          setResults([]);
        }}
      />
    </form>
    
  );
}
