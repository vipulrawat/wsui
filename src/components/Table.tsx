import { useStocks } from "context/StocksContext";
import React, { useMemo } from "react";
import ConnectionStatus from "./ConnectionStatus";
import StockRow from "./StockRow";

const Table = () => {
  const { state } = useStocks();

  const data = useMemo(() => state.data, [state]);

  if (!Object.keys(data).length) {
    return <div className="text-indigo-500">Loading...</div>;
  }

  return (
    <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
      <div className="p-2 flex justify-between items-center">
        <ConnectionStatus status={state.hasOpened} />
      </div>
      <table className="shadow-lg bg-white min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Value
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              History
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Updated At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {Object.keys(data).map((stock_name, index) => {
            let { price, status, updatedAt } = data[stock_name];
            return (
              <StockRow
                key={index}
                name={stock_name}
                price={price}
                status={status}
                updatedAt={updatedAt}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
