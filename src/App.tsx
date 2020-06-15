import Error from "components/Error";
import Table from "components/Table";
import { useStocks } from "context/StocksContext";
import React, { useEffect, useRef } from "react";
import "./tailwind.generated.css";

const App = () => {
  const { state, dispatch } = useStocks();

  const URL = "ws://stocks.mnet.website";
  const socket = useRef(new WebSocket(URL));

  useEffect(() => {
    socket.current.onopen = () => {
      dispatch({
        type: "TOGGLE_CONN_STATUS",
      });
    };

    socket.current.onclose = () => {
      dispatch({
        type: "TOGGLE_CONN_STATUS",
      });
    };

    socket.current.onerror = (error) => {
      console.log(error);

      dispatch({
        type: "ERROR",
      });
    };

    socket.current.onmessage = (msg) => {
      dispatch({
        type: "DATA",
        payload: JSON.parse(msg.data),
      });
    };
  });

  useEffect(() => {
    return function cleanup() {
      return socket.current.close();
    };
  }, [socket]);

  return (
    <div className="w-full h-screen bg-gray-100 flex overflow:hidden">
      <div className="m-auto">{state.hasError ? <Error /> : <Table />}</div>
    </div>
  );
};

export default App;
