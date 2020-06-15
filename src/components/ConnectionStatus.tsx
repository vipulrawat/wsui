import React, { Fragment } from "react";

type Props = {
  status: boolean;
};

const ConnectionStatus = ({ status }: Props) => {
  return (
    <Fragment>
      <span className="text-black text-sm font-semibold">
        Connection Status:
      </span>
      <span
        className={`inline-flex items-center px-4 py-2 rounded text-xs font-medium leading-4 ${
          status ? "bg-green-200 text-green-800" : "bg-red-200 text-green-800"
        }`}
      >
        {status ? "Connected" : "Disconnected"}
      </span>
    </Fragment>
  );
};

export default ConnectionStatus;
