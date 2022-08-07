import React, { createContext, FC, ReactNode } from "react";
import { GameState } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";

interface GameStateInterface {
  state: GameState;
  update?: (state: GameState) => void;
  remove?: (id: string) => void;
}

let defaultGameStateContext: GameStateInterface = {
  state: {},
};

export let GlobalStateContext = createContext<GameStateInterface>(
  defaultGameStateContext
);

export let GlobalState: FC<{
  children: ReactNode;
}> = ({ children }) => {
  let [games, setGames] = useLocalStorage("@pepper-games", {
    games: {},
  });

  return (
    <GlobalStateContext.Provider
      value={{
        state: games,
        update: (state: GameState) => {
          setGames((prev: GameState) => ({
            ...prev,
            ...state,
          }));
        },
        remove: (id: string) => {
          let temp = { ...games };
          delete temp[id];
          setGames(temp);
        },
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
