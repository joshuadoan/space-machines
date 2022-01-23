import React from "react"
import useGame from "./hooks/use-game";
import Details from "./components/Details";
import Journal from "./components/Journal";
import GuestList from './components/GuestList'
import { Link, useSearchParams } from "react-router-dom";
import { buildFactions, SortKeys } from "./game-utils";
import Avatar from "./components/Avatar";

export let App = () => {
  let [searchParams] = useSearchParams();
  let [ships, selected, spaceStations] = useGame();
  let factions = buildFactions(ships)
  let sort = searchParams.get("sort") as SortKeys;

  return (
    <section>
      <header className="flex items-start md:items-center gap-4 ">
        {
          selected
            ? <Details ship={selected} />
            : <nav className="flex flex-1 gap-4">
              <Link to={`/`} aria-selected={!sort} >○</Link>
              <Link to={`/?sort=◐`} aria-selected={sort === "◐"}>◐</Link>
              <Link to={`/?sort=⚡`} aria-selected={sort === "⚡"}>⚡</Link>
            </nav>
        }
        <section className="opacity-0 md:opacity-100 flex gap-2">
          🚀 {ships.length} 🪐 {spaceStations.length}
        </section>
        <section className="flex gap-2 pl-4">
          {
            Object.values(factions).map(({ color, goods, name }) => (
              <span
                key={name}
                className="flex gap-2"
                aria-selected={color.toString() === selected?.color.toString()}


              >
                <Avatar
                  size={6}
                  color={color}
                  seed={color.toString()}
                  name={name} />
                {goods}
              </span>
            ))
          }
        </section>
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
