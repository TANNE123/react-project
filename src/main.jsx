import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import NavigationComponent from "./components/navigation-components/navigations-path.jsx";
import "../src/all-styles/card-style.scss";
import "../src/all-styles/form-validation.scss";
import "../src/all-styles/videos-card.style.scss";
import { Provider } from "react-redux";
import { reduxStore } from "./api-sercers-toolkit/store.js";

import "react-loading-skeleton/dist/skeleton.css";

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <StrictMode>
      <BrowserRouter>
        <NavigationComponent />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
