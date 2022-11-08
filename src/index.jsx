import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//Technically, Provider is a component
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import App from "./App";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware())
);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
