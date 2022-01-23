import { Actor, CollisionType, Color, Vector } from "excalibur";
import { LightsOpacity, ShipSizes, Total } from "../../../constants";
import { SpaceStation } from "../space-station/space-station";
import { createStateMachineDefinition } from "./state-definition";
import { createMachine, Machine } from "../../../createMachine";
import {
  generateName,
  getRandomScreenPosition,
  getSnack,
  itsBeenAFewSeconds,
  logJournal,
  randomFromArray
} from "../../../game-utils";

export class Ship extends Actor {
  public state: Machine;
  public visited: Vector[];
  public journal: JournalEntry[];
  public selected: boolean;
  public fuel: number = 100;
  public snack: any = {};
}

export type JournalEntry = {
  at: Date;
  message: string;
};

export type ShipOptions = { color: Color };

export let createShip = ({ color }: ShipOptions) => {
  let { firstName, lastName } = generateName();

  let ship = new Ship({
    // color: ShipColors[Math.floor(Math.random() * ShipColors.length)],
    name: `${firstName} ${lastName}`,
    radius: ShipSizes.Small,
    color
  });

  let stateDefinition = createStateMachineDefinition(ship, {
    at: new Date(),
    type: "Off"
  });

  ship.on("initialize", (e) => {
    let ship = e.target as Ship;
    ship.body.collisionType = CollisionType.Passive;
    ship.graphics.opacity = LightsOpacity.Off;
    ship.state = createMachine(stateDefinition);
    ship.visited = [];
    ship.journal = [
      {
        at: new Date(),
        message: "⭐ Entered the system"
      }
    ];
    ship.selected = false;
    ship.fuel = Total.Fuel;
    ship.pos = getRandomScreenPosition(ship);
  });

  ship.on("preupdate", (e) => {
    let ship = e.target as Ship;
    let { transition, value } = ship.state;

    if (ship.fuel <= 0) {
      transition(value, "Recharge");
      logJournal(ship, "⚡ Recharging");
    }

    switch (value.type) {
      case "Off":
        if (!itsBeenAFewSeconds(value.at)) return;
        logJournal(
          ship,
          `⭐ ${randomFromArray([
            "Turned on the engine. Stared at the map for a bit"
          ])}`
        );
        transition(value, "Turn on engine");
        break;
      case "Visiting":
        if (!itsBeenAFewSeconds(value.at)) return;
        transition(value, "Leave");
        break;
      case "Idle":
        if (!itsBeenAFewSeconds(value.at)) return;
        if (ship.visited.length >= Total.TradeRouteDelta) {
          logJournal(ship, "⭐ Flew a trade route");
          transition(value, "Begin route");
          break;
        }
        logJournal(
          ship,
          `🚀 ${randomFromArray(["Explored the great unknown"])}`
        );
        transition(value, "Fly to random point");
        break;
      case "Exploring":
        if (!itsBeenAFewSeconds(value.at, 30, 10)) return;

        logJournal(
          ship,
          `⭐ ${randomFromArray([
            `Favorite foods ${
              Object.entries(ship.snack).length
                ? Object.entries(ship.snack).map(
                    ([food, count]) => ` ${food} ${count} `
                  )
                : "Was hungry"
            }`,
            `Stopped to eat a snack ${getSnack(ship)}`,
            `${
              ship.visited.length < 1
                ? "Wondered where all the space stations are around here"
                : `Has logged ${ship.visited.length} space stations.`
            }`,
            "Pulled over to make sure the glibulator wasn't fumbilating"
          ])}`
        );
        transition(value, "Turn Off engine");
        break;
    }
  });

  ship.on("collisionstart", (e) => {
    let ship = e.target as Ship;
    let { transition, value } = ship.state;

    if (e.other instanceof SpaceStation) {
      switch (value.type) {
        case "Exploring":
          logJournal(
            ship,
            `🪐 Visited ● ${e.other.name} station for the first time and logged its location`
          );
          transition(value, "Visit", e.other);
          break;
        case "On a trade route": {
          logJournal(ship, `⭐ Traded at ● ${e.other.name} station`);
          transition(value, "Visit", e.other);
          break;
        }
      }
    }

    if (e.other instanceof Ship) {
      switch (value.type) {
        case "Exploring":
          logJournal(ship, `💬 Chatted with 🚀 ${e.other.name} on the radio`);
          break;
        case "On a trade route": {
          logJournal(
            ship,
            `👋 Waved at 🚀 ${e.other.name} while on a trade route`
          );
          break;
        }
      }
    }
  });

  return ship;
};
