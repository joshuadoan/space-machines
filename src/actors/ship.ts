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

  const state: Machine = createMachine({
    initialState: {
      type: States.Off
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
              type: States.Flying
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
              type: States.Off
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

  ship.stateMachine = state;
  ship.body.collisionType = CollisionType.Passive;

  /**
   * Post update events
   */
  ship.on("postupdate", (e: PostUpdateEvent) => {
    const ship = e.target as Ship;
    bounceOffEdges(ship, e.engine);
  });

  return ship;
};
