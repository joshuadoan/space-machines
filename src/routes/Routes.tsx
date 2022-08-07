import React from "react";
import { Route, Routes } from "react-router-dom";
import { Game } from "./Game/Game";
import { Games } from "./Game/Games";
import { New } from "./Game/New";
import { Nothing } from "./Nothing";

export default () => (
  <Routes>
    <Route index element={<Nothing>Under construction.</Nothing>} />
    <Route path="games" element={<Games />}>
      <Route path="new" element={<New />} />
      <Route path=":gameId" element={<Game />}>
        <Route path="ships" element={<Game />}>
          <Route path=":shipId" element={<Game />} />
        </Route>
      </Route>
    </Route>
  </Routes>
);
