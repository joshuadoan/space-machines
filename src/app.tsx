import React from "react"
import useGame from "./hooks/use-game";
import SelectedHeader from "./components/Details";
import Journal from "./components/Journal";
import GuestList from './components/GuestList'
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import { generateName, SortKeys, sortShips } from "./game-utils";
import { Color } from "excalibur";

export let App = () => {
  let [ships, selected, spaceStations] = useGame();
  let [searchParams] = useSearchParams();

  let sort = searchParams.get("sort") as SortKeys;
  let filteredShips = ships.sort((a, b) => sortShips(a, b, sort))

  return (
    <section >
      <header className="flex items-center gap-6">
        {
          selected
            ? <SelectedHeader selected={selected} />
            : <>
              <Link to={`/`} aria-selected={!sort} >○</Link>
              <Link to={`/?sort=◐`} aria-selected={sort === "◐"}>◐</Link>
              <Link to={`/?sort=⚡`} aria-selected={sort === "⚡"}>⚡</Link>
              <span>🚀 {filteredShips.length}</span>
              <span>🪐 {spaceStations.length}</span>
            </>
        }
      </header>
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
    </section >
  )
}
