import React, { useContext } from "react";
import { v4 as useId } from "uuid";
import { Link, Outlet } from "react-router-dom";
import { GlobalStateContext } from "../Providers/GlobalState";

export let Games = () => {
  const { state: games } = useContext(GlobalStateContext);

  return (
    <main className="h-full flex items-center p-4">
      <nav className="flex flex-col h-full gap-4 p-4 items-start">
        <Link to="new">+ new game</Link>
        {Object.keys(games).map((id) => (
          <Link to={id} key={id}>
            {id}
          </Link>
        ))}
      </nav>
      <section className="h-full flex-1 justify-center text-center">
        <Outlet />
      </section>
    </main>
  );
};
