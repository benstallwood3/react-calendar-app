import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Calendar from "./components/Calendar";

ReactDOM.render(<Calendar />, document.getElementById("root"));
registerServiceWorker();
