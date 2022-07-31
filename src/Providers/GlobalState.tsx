import React, { createContext, FC, ReactNode, useReducer } from "react";
import { Game, GameState } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";

interface GameStateInterface {
  state: GameState;
  update: (state: GameState) => void;
}

const defaultGameStateContext: GameStateInterface = {
  state: {},
  update: (state: GameState) => {},
};

export const GlobalStateContext = createContext<GameStateInterface>(
  defaultGameStateContext
);

export const GlobalState: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [games, setGames] = useLocalStorage<{
    games: GameState;
    setGames?: (state: GameState) => void;
  }>("@pepper-games", {
    games: {},
  });

  function update(state: GameState) {
    setGames((prev: GameState) => ({
      ...prev,
      ...state,
    }));
  }

  return (
    <GlobalStateContext.Provider
      value={{
        state: games,
        update,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
