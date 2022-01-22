import React from "react"
import useGame from "./hooks/use-game";
import Details from "./components/Details";
import Journal from "./components/Journal";
import GuestList from './components/GuestList'
import { Link, useSearchParams } from "react-router-dom";
import { SortKeys } from "./game-utils";

export let App = () => {
  let [searchParams] = useSearchParams();
  let sort = searchParams.get("sort") as SortKeys;
  let [ships, selected, spaceStations] = useGame();

  return (
    <section>
      <header className="flex items-center gap-6">
        {
          selected
            ? <Details selected={selected} />
            : <nav className="flex gap-2">
              <Link to={`/`} aria-selected={!sort} >○</Link>
              <Link to={`/?sort=◐`} aria-selected={sort === "◐"}>◐</Link>
              <Link to={`/?sort=⚡`} aria-selected={sort === "⚡"}>⚡</Link>
            </nav>
        }
        <span>🚀 {ships.length}</span>
        <span>🪐 {spaceStations.length}</span>
      </header>
      <main className="flex-col md:flex-row">
        <aside className="md:w-96 h-64 md:h-full">
          {
            selected
              ? <Journal selected={selected} />
              : <GuestList ships={ships} />
          }
        </aside>
        <section className="flex-1">
          <canvas id="game"></canvas>
        </section>
      </main>
    </section >
  )
}
