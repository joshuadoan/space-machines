import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nothing } from "./routes/Nothing";
import "./app.css";
import { Game } from "./routes/Game";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Nothing>Under construction.</Nothing>} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("app")
);
