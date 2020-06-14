import { useStocks } from "context/StocksContext";
import React, { useMemo } from "react";
import { useTable } from "react-table";

const Table = () => {
  const { state } = useStocks();

  const data = useMemo(() => {
    return state.data;
  }, [state]);

  const columns = useMemo(() => {
    return [
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "price",
        accessor: "price",
      },
      {
        Header: "status",
        accessor: "status",
      },
      {
        Header: "time",
        accessor: "updatedAt",
      },
    ];
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
  } = useTable({ columns, data });

  if (!data.length) {
    return <div className="text-indigo-600">Loading</div>;
  }

  return (
    <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
      <table {...getTableProps()} className="shadow-lg bg-white min-w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  let cl = "";
                  if (cell.value === "UP") {
                    cl = "bg-green-400";
                  } else if (cell.value === "DOWN") {
                    cl = "bg-red-400";
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`px-6 py-4 whitespace-no-wrap border-b border-gray-200 border px-8 py-2 text-sm ${cl}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
