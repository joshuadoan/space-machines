import React from "react"
import useGame from "./hooks/use-game";
import SelectedHeader from "./components/SelectedHeader";
import Diary from "./components/Journal";
import GuestList from './components/GuestList'
import { Link, useSearchParams } from "react-router-dom";
import { filterByRoutes } from "./game-utils";

export let App = () => {
  let [ships, selected, spaceStations] = useGame();
  let [searchParams] = useSearchParams();
  let filter = searchParams.get("filter");
  let filteredShips = ships.filter(s => filterByRoutes(s, filter))

  return (
    <section className="flex flex-col-reverse md:flex-col">
      {selected
        ? <SelectedHeader selected={selected} />
        : <header className="flex items-center gap-6">
          <Link to={`/`} className={!filter ? "active" : ""}>○</Link>
          <Link to={`/?filter=◐`} className={filter === "◐" ? "active" : ""}>◐</Link>
          <Link to={`/?filter=●`} className={filter === "●" ? "active" : ""}>●</Link>
          <span>🚀 {filteredShips.length}</span>
          <span>🪐 {spaceStations.length}</span>
        </header>}
      <main className="flex-col-reverse md:flex-row">
        <aside className="md:w-96 h-64 md:h-full">
          {
            selected
              ? <Diary selected={selected} />
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
