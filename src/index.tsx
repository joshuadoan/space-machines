import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Nothing } from "./routes/Nothing";
import "./app.css";
import { Games } from "./routes/Games";
import { Game } from "./routes/Game";
import { New } from "./routes/New";
import { GlobalState } from "./Providers/GlobalState";

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
