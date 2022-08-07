import React, { useContext, useEffect } from "react";
import { Link, Outlet, useParams, useMatch } from "react-router-dom";
import { Breadcrumb } from "../../components/BreadCrumb";
import { GlobalStateContext } from "../../Providers/GlobalState";
import { Trash } from "../../components/icons";
import useDate from "../../hooks/useDate";

export let Games = () => {
  let params = useParams();
  const { format } = useDate();
  let { state, remove } = useContext(GlobalStateContext);
  let gameId = params.gameId;

  return (
    <main className="min-h-screen flex flex-col max-w-screen-lg ml-auto mr-auto p-4">
      <header>
        <Breadcrumb />
      </header>
      {!gameId && !useMatch("/games/new") && (
        <nav className="px-2 py-4">
          {Object.keys(state).map((id) => (
            <Link
              to={id}
              key={id}
              className="flex items-center justify-between hover:underline"
            >
              {state[id].label} {` `}
              {format(state[id].updatedAt).date} {` `}
              {format(state[id].updatedAt).time}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  remove?.(id);
                }}
              >
                <Trash />
              </button>
            </Link>
          ))}
        </nav>
      )}
      <Outlet />
    </main>
  );
};
