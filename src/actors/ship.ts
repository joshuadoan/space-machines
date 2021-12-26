import { Actor, CollisionType, Color, PostUpdateEvent } from "excalibur";
import { bounceOffEdges, createMachine, Machine } from "../utils";
import {
  dimLights,
  flyInRandomDirection,
  turnOnLights,
  stop
} from "./shipUtils";

export const ShipColors = [
  Color.DarkGray,
  Color.LightGray,
  Color.Azure,
  Color.Magenta
];

export const radius = 4;
export const ShipNames = ["Trader", "Pirate"];

export enum States {
  Off = "Off",
  Idle = "Idle",
  Flying = "Flying"
}

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

  const state: Machine = createMachine({
    initialState: {
      type: States.Off,
      at: new Date()
    },
    states: {
      [States.Off]: {
        transitions: {
          [Transitions.TurnOnEngine]: {
            target: {
              type: States.Idle,
              at: new Date()
            },
            effect() {
              turnOnLights(ship);
            }
          }
        }
      },
      [States.Idle]: {
        transitions: {
          [Transitions.FlyToRandomPoint]: {
            target: {
              type: States.Flying,
              at: new Date()
            },
            effect() {
              flyInRandomDirection(ship);
            }
          }
        }
      },
      [States.Flying]: {
        transitions: {
          [Transitions.TurnOffEngine]: {
            target: {
              type: States.Off,
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

  /**
   * Post update events
   */
  ship.on("postupdate", (e: PostUpdateEvent) => {
    const ship = e.target as Ship;
    bounceOffEdges(ship, e.engine);
  });

  return ship;
};
