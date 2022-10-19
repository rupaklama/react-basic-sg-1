import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Replaces ReactDOM.render when the .render method is called and enables Concurrent Mode.
// Concurrent Mode is a set of new features that help React apps stay responsive
// and gracefully adjust to the user's device capabilities and network speed.

// Note - Concurrency is a foundational update to React's rendering mechanism

// The root can be used to render a React element into the DOM with render
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
