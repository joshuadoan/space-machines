import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createShip, Ship } from "./actors/ship/ship";
import { createSpaceStation, SpaceStation } from "./actors/space-station/space-station";
import { Total } from "../constants";
import { createGame, Game } from "./game";
import { useSearchParams } from "react-router-dom";
import { addLabel, removeAllLabels, resetCamera, zoomToActor } from "./actors/game-utils";

export default function (): [Ship[], Ship | null, SpaceStation[]] {
  let gameReference = useRef<Game>()
  let [searchParams] = useSearchParams();

  let id = searchParams.get("ship");

  let [ships, setShips] = useState<Ship[]>([])
  let [spaceStations, setSpaceStations] = useState<SpaceStation[]>([])
  let selected = id && ships.find(s => s.id === Number(id)) || null;

  function updateState() {
    let game = gameReference.current;
    if (!game) return

    let shipsOnCanvas = game.currentScene.actors.filter(a => a instanceof Ship)
    setShips(shipsOnCanvas as Ship[])

    let spaceStationsOnCanvas = game.currentScene.actors.filter(a => a instanceof SpaceStation)
    setSpaceStations(spaceStationsOnCanvas as SpaceStation[])
  }

  useEffect(() => {
    let game: Game = createGame();
    [...Array(Total.SpaceStations)].map(() => {
      let spaceStation = createSpaceStation(game);
      game.add(spaceStation)
    });

    [...Array(Total.Ships)].map(() => {
      let ship = createShip();
      game.add(ship);
    });

    gameReference.current = game;
    game.start();

    let interval = setInterval(updateState, 1);
    return () => clearInterval(interval);
  }, [])

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

  return [ships, selected, spaceStations]
}
