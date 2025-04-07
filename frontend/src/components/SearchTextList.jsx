import React from "react";

function SearchTextList({ searchTexts, onSearchTextClick, onClearHistory }) {
  return (
    <div className="p-6 font-sans bg-gray-50">
      <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3 mb-6">
        <h2 className="text-gray-800 text-2xl font-bold text-center">
          Search History
        </h2>
        <button
          onClick={onClearHistory}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
        >
          Clear History
        </button>
      </div>
      <ul className="list-none space-y-4">
        {searchTexts.map((searchText, index) => (
          <li key={index}>
            <button
              onClick={() => onSearchTextClick(searchText.toLowerCase())}
              className="w-full text-left text-gray-700 bg-gray-100 py-3 px-5 rounded-lg shadow-md hover:bg-indigo-500 hover:text-white transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {searchText}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTextList;
