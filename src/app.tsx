import React from "react"
import useGame from "./hooks/use-game";
import SelectedHeader from "./components/SelectedHeader";
import Journal from "./components/Journal";
import GuestList from './components/GuestList'
import { Link, useSearchParams } from "react-router-dom";
import { SortKeys, sortShips } from "./game-utils";

export let App = () => {
  let [ships, selected, spaceStations] = useGame();
  let [searchParams] = useSearchParams();

  let sort = searchParams.get("sort") as SortKeys;
  let filteredShips = ships.sort((a, b) => sortShips(a, b, sort))

  return (
    <section >
      {
        selected
          ? <SelectedHeader selected={selected} />
          : <header className="flex items-center gap-6">
            <Link to={`/`} className={!sort ? "active" : ""}>○</Link>
            <Link to={`/?sort=◐`} className={sort === "◐" ? "active" : ""}>◐</Link>
            <Link to={`/?sort=⚡`} className={sort === "⚡" ? "active" : ""}>⚡</Link>
            <span>🚀 {filteredShips.length}</span>
            <span>🪐 {spaceStations.length}</span>
          </header>
      }
      <main className="flex-col-reverse md:flex-row">
        <aside className="md:w-96 h-64 md:h-full">
          {
            selected
              ? <Journal selected={selected} />
              : <GuestList ships={filteredShips} />
          }
        </aside>
        <section className="flex-1">
          <canvas id="game"></canvas>
        </section>
      </main>
    </section>
  )
}
