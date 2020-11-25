import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import reducer from "./reducer";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
