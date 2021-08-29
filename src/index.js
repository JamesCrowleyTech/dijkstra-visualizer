import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import reportWebVitals from "./reportWebVitals";

// const max = 10000;
// const min = 1;
// const intervals = [1, 2, 5, 10, 100, 1000];
// const sliderPoints = (max - min) / (sum(intervals) / intervals.length);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
