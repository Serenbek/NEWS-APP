import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import NewsPage from "./components/NewsPage/NewsPage";
import Registration from "./components/Registration/Registration";
import SingleNew from "./components/SingleNew/SingleNew";
import UserPage from "./components/UserPage/UserPage";
import { Route, Routes } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/newsPage" element={<NewsPage />} />
        <Route path="/newsPage/:id" element={<SingleNew />} />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
