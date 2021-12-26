import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  PostUpdateEvent,
  PreUpdateEvent
} from "excalibur";
import { Machine, State } from "../utils";
import { bounceOffEdges, itsBeenAFewSeconds } from "./actor-utils";
import { buildShipState } from "./state";

export const ShipColors = [
  Color.DarkGray,
  Color.LightGray,
  Color.Azure,
  Color.Magenta
];

export const radius = 2;
export const ShipNames = ["Trader", "Pirate"];

type Off = "Off";
type Idle = "Idle";
type Flying = "Flying";

export type ShipStates = Off | Idle | Flying;

export type TurnOffEngine = "Turn off engine";
export type TurnOnEngine = "Turn on engine";
export type FlyToRandomPoint = "Fly to random point";

export type ShipTransitions = TurnOffEngine | TurnOnEngine | FlyToRandomPoint;

export class Ship extends Actor {
  public stateMachine: any;
}

export const CreateShip = ({ x, y }: { x: number; y: number }) => {
  const ship = new Ship({
    x,
    y,
    radius,
    name: ShipNames[Math.floor(Math.random() * ShipNames.length)],
    color: ShipColors[Math.floor(Math.random() * ShipColors.length)]
  });

  ship.body.collisionType = CollisionType.Passive;
  ship.graphics.opacity = 0.2;

  const state: Machine<ShipStates, ShipTransitions> = buildShipState(ship);
  ship.stateMachine = state;

  ship.on("preupdate", (e: PreUpdateEvent) => {
    const ship = e.target as Ship;
    const stateMachine = ship.stateMachine as Machine<
      ShipStates,
      ShipTransitions
    >;

    switch (stateMachine.value.type) {
      case "Off": {
        if (itsBeenAFewSeconds(state.value.at)) {
          stateMachine.transition(state.value, "Turn on engine");
        }
        break;
      }
      case "Idle": {
        if (itsBeenAFewSeconds(state.value.at)) {
          stateMachine.transition(state.value, "Fly to random point");
        }
        break;
      }
    }
  });

  ship.on("collisionstart", (e: CollisionStartEvent) => {
    const ship = e.target as Ship;
    const stateMachine = ship.stateMachine as Machine<
      ShipStates,
      ShipTransitions
    >;``

    if (stateMachine.value.type === "Flying") {
      stateMachine.transition(stateMachine.value, "Turn off engine");
    }
  });

  ship.on("postupdate", (e: PostUpdateEvent) => {
    const ship = e.target as Ship;
    bounceOffEdges(ship, e.engine);
  });

  return ship;
};
