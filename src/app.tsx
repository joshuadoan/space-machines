import React from "react"
import useGame from "./game/use-game";
import SelectedHeader from "./components/SelectedHeader";
import Diary from "./components/Diary";
import GuestList from './components/GuestList'

export let App = () => {
  let [ships, selected, spaceStations] = useGame();
  return (
    <>
      {selected
        ? <SelectedHeader selected={selected} />
        : <header>🚀 {ships.length} 🪐 {spaceStations.length}</header>}
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
