import { StockItem, StockStatus } from "context/StocksContext";
import React from "react";
import ReactTimeAgo from "react-time-ago";

type TDProps = React.PropsWithChildren<{
  data?: string | number;
  statusBg?: string;
  statusText?: string;
}>;

const TD = ({ children, data, statusBg, statusText }: TDProps) => (
  <td
    className={`px-6 py-4 whitespace-no-wrap border-b border-gray-200 border px-8 py-2 text-sm text-center ${statusBg} ${statusText}`}
  >
    {children || data}
  </td>
);

type Props = {
  name: string;
} & StockItem;

const TableRow = ({ name, price, status, updatedAt }: Props) => {
  let statusBg = "";
  let statusText = "";
  if (status === StockStatus.UP) {
    statusBg = "bg-green-400";
    statusText = "text-green-700";
  } else if (status === StockStatus.DOWN) {
    statusBg = "bg-red-400";
    statusText = "text-red-700";
  }

  return (
    <tr key={name}>
      <TD data={name} />
      <TD data={price} statusText={statusText} />
      <TD data={status} statusBg={statusBg} />
      <TD>
        <ReactTimeAgo date={updatedAt} />
      </TD>
    </tr>
  );
};

export default TableRow;
