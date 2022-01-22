import React from "react"
import useGame from "./hooks/use-game";
import Details from "./components/Details";
import Journal from "./components/Journal";
import GuestList from './components/GuestList'
import { Link, useSearchParams } from "react-router-dom";
import { generateName, SortKeys } from "./game-utils";
import { Color } from "excalibur";
import Avatar from "./components/Avatar";

export let App = () => {
  let [searchParams] = useSearchParams();
  let [ships, selected, spaceStations] = useGame();
  let sort = searchParams.get("sort") as SortKeys;
  let factions: {
    [key in string]: {
      name: string,
      color: Color,
      goods: number
    }
  } = {}

  ships.forEach(ship => {
    let { lastName } = generateName();
    factions[ship.color.toString()] = {
      name: lastName,
      color: ship.color,
      goods: factions[ship.color.toString()]
        ? factions[ship.color.toString()].goods += ship.visited.length
        : ship.visited.length
    }
  })
  return (
    <section>
      <header className="flex items-center gap-2">
        {
          selected
            ? <Details ship={selected} />
            : <nav className="flex gap-2">
              <Link to={`/`} aria-selected={!sort} >○</Link>
              <Link to={`/?sort=◐`} aria-selected={sort === "◐"}>◐</Link>
              <Link to={`/?sort=⚡`} aria-selected={sort === "⚡"}>⚡</Link>
            </nav>
        }
        <span className="flex gap-2 pl-4">🚀 {ships.length} 🪐 {spaceStations.length}</span>
        <span className="flex gap-2 pl-4">
          {
            Object.values(factions).map(({ name, color, goods }) => (
              <><Avatar size={6} color={color} /> {goods}</>
            ))
          }
        </span>
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
