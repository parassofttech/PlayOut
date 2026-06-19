import { Search, X } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (value) => {
    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setQuery("");

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>

      <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <Search
          size={20}
          className="ml-4 text-gray-400 flex"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search games..."
          className="w-full px-4 py-4 bg-transparent outline-none text-white placeholder-gray-400"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="mr-4 text-gray-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;