import React, { useState, useEffect } from "react";
import SearchTextList from "./SearchTextList";
import PriceHistoryTable from "./PriceHistoryTable";
import axios from "axios";
import TrackedProductList from "./TrackedProductList";

const URL = "http://localhost:5000";

const Main = () => {
    const [showPriceHistory, setShowPriceHistory] = useState(false);
    const [priceHistory, setPriceHistory] = useState([]);
    const [searchTexts, setSearchTexts] = useState([]);
    const [newSearchText, setNewSearchText] = useState("");

  useEffect(() => {
    fetchUniqueSearchTexts();
  }, []);

  const fetchUniqueSearchTexts = async () => {
    try {
      const response = await axios.get(`${URL}/unique_search_texts`);
      const data = response.data;
      setSearchTexts(data);
    } catch (error) {
      console.error("Error fetching unique search texts:", error);
    }
  };

  const handleSearchTextClick = async (searchText) => {
    try {
      const response = await axios.get(
        `${URL}/results?search_text=${searchText}`
      );

      const data = response.data;
      setPriceHistory(data);
      setShowPriceHistory(true);
    } catch (error) {
      console.error("Error fetching price history:", error);
    }
  };

  const handlePriceHistoryClose = () => {
    setShowPriceHistory(false);
    setPriceHistory([]);
  };

  const handleNewSearchTextChange = (event) => {
    setNewSearchText(event.target.value);
  };

  const handleNewSearchTextSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${URL}/start-scraper`, {
        search_text: newSearchText,
        url: "https://amazon.ca",
      });

      alert("Scraper started successfully");
      setSearchTexts([...searchTexts, newSearchText]);
      setNewSearchText("");
    } catch (error) {
      alert("Error starting scraper:", error);
    }
  };

  return (
    <div className="main bg-gray-50 min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-blue-700 text-4xl font-bold mb-6 text-center">Product Search Tool</h1>
        <form onSubmit={handleNewSearchTextSubmit} className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-3">
            Search for a new item:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newSearchText}
              onChange={handleNewSearchTextChange}
              className="border border-gray-300 rounded-lg p-3 flex-grow focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter search term..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Start Scraper
            </button>
          </div>
        </form>
  
        <div className="mb-6">
          <SearchTextList
            searchTexts={searchTexts}
            onSearchTextClick={handleSearchTextClick}
          />
        </div>
  
        <div className="mb-6">
          <TrackedProductList />
        </div>
  
        {showPriceHistory && (
          <div className="mt-6">
            <PriceHistoryTable
              priceHistory={priceHistory}
              onClose={handlePriceHistoryClose}
            />
          </div>
        )}
      </div>
    </div>
  );
  
}

export default Main