import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createShip, Ship } from "../game/actors/ship/ship";
import { createSpaceStation, SpaceStation } from "../game/actors/space-station/space-station";
import { Total } from "../constants";
import { createGame, Game } from "../game/game";
import { useSearchParams } from "react-router-dom";
import { addLabel, createFactions, removeAllLabels, resetCamera, SortKeys, sortShips, zoomToActor } from "../game-utils";
import useWindowSize from "./useWindowSize";
import { Color } from "excalibur";

export type Factions = {
  [key in string]: {
    name: string;
    color: Color;
    goods: number;
    members: Ship[];
  };
};

export default function (): [Ship[], Ship | null, SpaceStation[], Factions] {
  let windowSize = useWindowSize()
  let gameReference = useRef<Game>()
  let [searchParams] = useSearchParams()
  let [ships, setShips] = useState<Ship[]>([])
  let [factions] = useState<Factions>(createFactions())
  let [spaceStations, setSpaceStations] = useState<SpaceStation[]>([])

  let id = searchParams.get("ship")
  let sort = searchParams.get("sort") as SortKeys;
  let selected = id && ships.find(s => s.id === Number(id)) || null


  function updateState() {
    let game = gameReference.current;
    if (!game) return

    let { actors } = game.currentScene;

    let ships = actors
      .filter(a => a instanceof Ship)
      .sort((a, b) => sortShips(a as Ship, b as Ship, sort))

    let stations = actors
      .filter(a => a instanceof SpaceStation)

    setShips(ships as Ship[])
    setSpaceStations(stations as SpaceStation[])
  }

  useEffect(() => {
    let interval = setInterval(updateState, 100);
    return () => clearInterval(interval);
  }, [sort])

  useEffect(() => {
    let game: Game = createGame();

    [...Array(Total.SpaceStations)].forEach(() => {
      let spaceStation = createSpaceStation(game);
      game.add(spaceStation)
    });

    for (let name in factions) {
      [...Array(Total.Ships)].forEach(() => {
        let ship = createShip({
          color: factions[name].color
        });
        game.add(ship);
      })
    }

    gameReference.current = game;
    game.start();
  }, [windowSize])

  useLayoutEffect(() => {
    let game = gameReference.current;
    if (!game) return

    if (selected) {
      removeAllLabels(ships)
      addLabel(selected)
      zoomToActor(game, selected)
      return;
    }

    resetCamera(game)
    return () => {
      selected?.removeAllChildren()
    };
  }, [selected])

  return [ships, selected, spaceStations, factions]
}
