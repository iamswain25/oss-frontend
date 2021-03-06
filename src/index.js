import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import registerServiceWorker from "utils/registerServiceWorker";
import "assets/styles/core.css";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
