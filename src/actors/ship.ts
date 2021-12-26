import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  PostUpdateEvent,
  PreUpdateEvent
} from "excalibur";
import { Machine, State } from "../utils";
import { bounceOffEdges, itsBeenAFewSeconds } from "./shipUtils";
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

type TurnOffEngine = "Turn off engine";
type TurnOnEngine = "Turn on engine";
type FlyToRandomPoint = "Fly to random point";

export type ShipTransitions = TurnOffEngine | TurnOnEngine | FlyToRandomPoint;

export enum Transitions {
  TurnOffEngine = "Turn off engine",
  TurnOnEngine = "Turn on engine",
  FlyToRandomPoint = "Fly to random point"
}
export class Ship extends Actor {
  public state: any;
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

  const state: Machine<ShipStates> = buildShipState(ship);
  ship.state = state;

  ship.on("preupdate", (e: PreUpdateEvent) => {
    const ship = e.target as Ship;
    const state = ship.state.value as State<ShipStates>;

    switch (state.type) {
      case "Off": {
        if (itsBeenAFewSeconds(state.at)) {
          ship.state.transition(state, Transitions.TurnOnEngine);
        }
        break;
      }
      case "Idle": {
        if (itsBeenAFewSeconds(state.at)) {
          ship.state.transition(state, Transitions.FlyToRandomPoint);
        }
        break;
      }
    }
  });

  ship.on("collisionstart", (e: CollisionStartEvent) => {
    const ship = e.target as Ship;
    const state = ship.state.value as State<ShipStates>;

    if (state.type === "Flying") {
      ship.state.transition(state, Transitions.TurnOffEngine);
    }
  });

  ship.on("postupdate", (e: PostUpdateEvent) => {
    const ship = e.target as Ship;
    bounceOffEdges(ship, e.engine);
  });

  return ship;
};
