import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalStateContext } from "../Providers/GlobalState";

export let Breadcrumb = () => {
  let params = useParams();
  let { state } = useContext(GlobalStateContext);
  let gameId = params.gameId;
  return (
    <nav className="flex bg-orange bg-orange-400 text-black p-2 space-x-2">
      <Link to="/games" className="hover:underline">
        games
      </Link>
      {gameId && (
        <Link to={gameId}>
          --{">"} {state[gameId]?.label}
        </Link>
      )}
      <Link to="new" className="flex-1 text-end">
        + new game
      </Link>
    </nav>
  );
};
