import React from "react";

type Props = {
  status: boolean;
};

const ConnectionStatus = ({ status }: Props) => {
  return <div className="">{status ? "Connected" : "Connection Closed"}</div>;
};

export default ConnectionStatus;
