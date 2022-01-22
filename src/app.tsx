import React from "react"
import useGame from "./hooks/use-game";
import Details from "./components/Details";
import Journal from "./components/Journal";
import GuestList from './components/GuestList'
import { useSearchParams } from "react-router-dom";
import { SortKeys, sortShips } from "./game-utils";
import Nav from "./components/Nav";

export let App = () => {
  let [ships, selected, spaceStations] = useGame();
  let [searchParams] = useSearchParams();

  let sort = searchParams.get("sort") as SortKeys;
  let filteredShips = ships.sort((a, b) => sortShips(a, b, sort))

  return (
    <section>
      <header className="flex items-center gap-6">
        {
          selected
            ? <Details selected={selected} />
            : <Nav>
              <span>🚀 {filteredShips.length}</span>
              <span>🪐 {spaceStations.length}</span>
            </Nav>
        }
      </header>
      <main className="flex-col md:flex-row">
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
    </section >
  )
}
