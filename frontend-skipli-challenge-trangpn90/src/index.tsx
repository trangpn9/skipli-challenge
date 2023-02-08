import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SSRProvider from "react-bootstrap/SSRProvider";
import { GlobalProvider } from "./contexts/GlobalContext";
import CusToast from "./components/CusToast";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <SSRProvider>
      <GlobalProvider>
        <App />
        <CusToast></CusToast>
      </GlobalProvider>
    </SSRProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
