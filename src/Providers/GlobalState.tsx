import React, { createContext, FC, ReactNode } from "react";
import { GameState } from "../types";
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
  const [games, setGames] = useLocalStorage("@pepper-games", {
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
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
