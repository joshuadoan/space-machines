import React, { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { GlobalStateContext } from "../../Providers/GlobalState";
import useDate from "../../hooks/useDate";

type gameState = "lit" | "unlit" | "broken";
type event = "TOGGLE" | "BREAK";

const NON_RESPONSIVE_EVENTS = {
  TOGGLE: undefined,
  BREAK: undefined,
};

const NEXT_STATE_GRAPH: {
  [key in gameState]: {
    [key in event]: gameState | undefined;
  };
} = {
  lit: {
    ...NON_RESPONSIVE_EVENTS,
    TOGGLE: "unlit",
    BREAK: "broken",
  },
  unlit: {
    ...NON_RESPONSIVE_EVENTS,
    TOGGLE: "lit",
    BREAK: "broken",
  },
  broken: NON_RESPONSIVE_EVENTS,
};

const reducer = (state: gameState, event: event) => {
  const nextState = NEXT_STATE_GRAPH[state][event];
  return nextState !== undefined ? nextState : state;
};

export let Game = () => {
  let params = useParams();
  const { format } = useDate();
  const [gameState, dispatch] = useReducer(reducer, "unlit");

  let { state, update } = useContext(GlobalStateContext);
  let gameId = params.gameId;

  if (!gameId) return null;

  let game = state[gameId];

  function updateGame() {
    if (!game) return;

    update?.({
      [game.id]: {
        ...game,
        updatedAt: Date.now(),
      },
    });
  }

  useEffect(() => {
    updateGame();
    const interval = setInterval(updateGame, 500);
    return () => clearInterval(interval);
  }, []);

  if (!game) return null;

  return (
    <section className="flex-1 flex px-2 py-4">
      <dl className="flex flex-col">
        <dt>name: {game?.label}</dt>
        <dd>
          created: {format(game.createdAt).date} {format(game.createdAt).time}
        </dd>
        <dd>
          updated: {format(game.updatedAt).date} {format(game.updatedAt).time}
        </dd>
      </dl>
      <div>
        State: {gameState}
        <button type="button" onClick={() => dispatch("TOGGLE")}>
          Toggle
        </button>
        <button type="button" onClick={() => dispatch("BREAK")}>
          Break
        </button>
      </div>
    </section>
  );
};
