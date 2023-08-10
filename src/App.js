import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./components/Card/Index";
import Header from "./components/Layout/Header";
import List from "./components/List/Index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../src/store/reducer";

const store = createStore(reducer);

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Routes>
              <Route exact path="/" element={<Cards />} />
              <Route path="/card/:key" element={<List />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
