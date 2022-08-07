import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalStateContext } from "../Providers/GlobalState";
import useDate from "../hooks/useDate";

export let Game = () => {
  let params = useParams();
  const { format } = useDate();
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
    const interval = setInterval(updateGame, 1000);
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
    </section>
  );
};
