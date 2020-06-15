import { StocksProvider } from "context/StocksContext";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

JavascriptTimeAgo.addLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <StocksProvider>
      <App />
    </StocksProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
