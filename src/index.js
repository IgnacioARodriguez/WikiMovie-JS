import React from "react";
import ReactDOM from "react-dom";
import Main from "./containers/Main";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Main />
      <ToastContainer autoClose={5000} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
