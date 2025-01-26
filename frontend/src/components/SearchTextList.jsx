import React from 'react';

function SearchTextList({ searchTexts, onSearchTextClick }) {
  return (
    <div className="p-5 font-sans">
      <h2 className="text-gray-800 border-b-2 border-gray-300 pb-2">All Products</h2>
      <ul className="list-none">
        {searchTexts.map((searchText, index) => (
          <li key={index} className="my-8">
            <button 
              onClick={() => onSearchTextClick(searchText)} 
              className="text-black border-none py-2 px-4 cursor-pointer rounded transition-colors duration-300 hover:bg-blue-700"
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
