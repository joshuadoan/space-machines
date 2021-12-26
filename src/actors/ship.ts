import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  PostUpdateEvent,
  PreUpdateEvent
} from "excalibur";
import { bounceOffEdges, createMachine, Machine, State } from "../utils";
import {
  dimLights,
  flyInRandomDirection,
  turnOnLights,
  stop
} from "./shipUtils";

const ONE_SECOND = 1000;

export const ShipColors = [
  Color.DarkGray,
  Color.LightGray,
  Color.Azure,
  Color.Magenta
];

export const radius = 4;
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

  const state: Machine<ShipStates> = createMachine<ShipStates>({
    initialState: {
      type: "Off",
      at: new Date()
    },
    states: {
      Off: {
        transitions: {
          [Transitions.TurnOnEngine]: {
            nextState: {
              type: "Idle",
              at: new Date()
            },
            effect() {
              turnOnLights(ship);
            }
          }
        }
      },
      Idle: {
        transitions: {
          [Transitions.FlyToRandomPoint]: {
            nextState: {
              type: "Flying",
              at: new Date()
            },
            effect() {
              flyInRandomDirection(ship);
            }
          }
        }
      },
      Flying: {
        transitions: {
          [Transitions.TurnOffEngine]: {
            nextState: {
              type: "Off",
              at: new Date()
            },
            effect() {
              stop(ship);
              dimLights(ship);
            }
          }
        }
      }
    }
  });

  ship.state = state;

  ship.on("preupdate", (e: PreUpdateEvent) => {
    const ship = e.target as Ship;
    const state = ship.state.value as State<ShipStates>;

    const now = new Date().getTime();
    const timeStarted = state.at ? state.at.getTime() : now;
    const timeDiff = now - timeStarted;

    switch (state.type) {
      case "Off": {
        if (timeDiff > 1 * ONE_SECOND) {
          ship.state.transition(state, Transitions.TurnOnEngine);
        }
        break;
      }
      case "Idle": {
        if (timeDiff > 1 * ONE_SECOND) {
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
