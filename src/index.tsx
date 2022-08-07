import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nothing } from "./routes/Nothing";
import { Games } from "./routes/Game/Games";
import { Game } from "./routes/Game/Game";
import { New } from "./routes/Game/New";
import { GlobalState } from "./Providers/GlobalState";
import "./app.css";

ReactDOM.render(
  <GlobalState>
    <BrowserRouter>
      <Routes>
        <Route index element={<Nothing>Under construction.</Nothing>} />
        <Route path="games" element={<Games />}>
          <Route path="new" element={<New />} />
          <Route path=":gameId" element={<Game />} />
        </Route>
        <Route path="*" element={<Nothing>Page not found.</Nothing>} />
      </Routes>
    </BrowserRouter>
  </GlobalState>,
  document.getElementById("app")
);
