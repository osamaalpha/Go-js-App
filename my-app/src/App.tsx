import "./App.css";
import React from "react";
import MainPage from "./pages/mainPage/MainPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
