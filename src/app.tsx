import React from "react"
import useGame from "./use-game";
import SelectedHeader from "./components/SelectedHeader";
import Diary from "./components/Diary";
import GuestList from './components/GuestList'
import { Link } from "react-router-dom";

export let App = () => {
  let [ships, selected, spaceStations] = useGame();

  return (
    <>
      {selected
        ? <SelectedHeader selected={selected} />
        : <header>
          🚀 {ships.length}
          <nav className="flex gap-4 px-4 py-4">
            <Link to={`/?filter=◌`}>◌</Link>
            <Link to={`/?filter=◐`}>◐</Link>
            <Link to={`/?filter=●`}>●</Link>
          </nav>
          🪐 {spaceStations.length}

        </header>}
      <main>
        <aside>
          {
            selected
              ? <Diary selected={selected} />
              : <GuestList ships={ships} />
          }
        </aside>
        <section className="w-[50%] sm:w-[70%]">
          <canvas id="game"></canvas>
        </section>
      </main>
    </>
  )
}
