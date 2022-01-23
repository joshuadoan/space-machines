import React from "react"
import useGame from "./hooks/use-game";
import Details from "./components/Details";
import Journal from "./components/Journal";
import GuestList from './components/GuestList'
import { Link, useSearchParams } from "react-router-dom";
import { SortKeys } from "./game-utils";
import Avatar from "./components/Avatar";

export let App = () => {
  let [searchParams] = useSearchParams();
  let [ships, selected, spaceStations, factions] = useGame();
  let sort = searchParams.get("sort") as SortKeys;

  return (
    <section>
      <header className="flex items-center px-4 py-4">
        {
          selected
            ? <Details ship={selected} />
            : <nav className="flex flex-1 gap-4">
              <Link to={`/`} aria-selected={!sort} >○</Link>
              <Link to={`/?sort=◐`} aria-selected={sort === "◐"}>◐</Link>
              <Link to={`/?sort=⚡`} aria-selected={sort === "⚡"}>⚡</Link>
            </nav>
        }
        <section className="flex gap-2 items-center">
          <span className="hidden md:block">🚀 {ships.length} 🪐 {spaceStations.length}</span>
          {
            Object.values(factions).map(({ color, name }) => (
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
              </span>
            ))
          }
        </section>
      </header >
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
