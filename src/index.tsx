import { StocksProvider } from "context/StocksContext";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <StocksProvider>
      <App />
    </StocksProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
