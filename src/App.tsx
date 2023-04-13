import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Provider>
  );
}
