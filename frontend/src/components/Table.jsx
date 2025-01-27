import React, { useState } from "react";
import ModalComponent from "./Modal";
import ProductDetailsPage from "./ProductDetailsPage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Table({ priceHistory, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const openModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getPriceData = (product) => {
    return product.priceHistory[0];
  };

  const getPriceChange = (product) => {
    if (product.priceHistory.length < 2) return 0;
    const currentPrice = product.priceHistory[0].price;
    const lastPrice = product.priceHistory[1].price;
    const change = 100 - (currentPrice / lastPrice) * 100;
    return Math.round(change * 100) / 100;
  };

  return (
    <div className="px-0 sm:px-6 md:px-0 lg:px-0 m-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Price History</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all products matching the search including their updated time, current price,
            and price change.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full border-separate"
                style={{ borderSpacing: 0 }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Update at
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Price Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {priceHistory.map((product, productIdx) => {
                    const priceData = getPriceData(product);
                    const change = getPriceChange(product);

                    return (
                    <tr key={product.url}>
                      <td
                        className={classNames(
                          productIdx !== product.length - 1
                            ? "border-b border-gray-200"
                            : "",
                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 truncate max-w-xs"
                          
                        )}
                        title={product.name}
                      >
                        <a onClick={() => openModal(product)}>{product.name}</a>
                      </td>
                      <td
                        className={classNames(
                          productIdx !== product.length - 1
                            ? "border-b border-gray-200"
                            : "",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell "
                        )}
                      >
                        {priceData.date}
                      </td>
                      <td
                        className={classNames(
                          productIdx !== product.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
                        )}
                      >
                        ${priceData.price}
                      </td>
                      <td
                        className={classNames(
                          productIdx !== product.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                          change > 0 ? "text-red-500" : "text-green-500"
                        )}
                      >
                        {change >= 0 && "+" }
                        {change}%
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
              <button className="bg-red-400 text-white py-1 px-1 m-2 rounded-lg hover:bg-red-500 transition-all" onClick={onClose}>Close</button>
              <ModalComponent
                isOpen={isModalOpen}
                closeModal={closeModal}
                content={<ProductDetailsPage product={currentProduct} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
