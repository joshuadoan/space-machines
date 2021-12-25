import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  PostUpdateEvent,
  PreUpdateEvent
} from "excalibur";
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

export const radius = 1;
export const ShipNames = ["Trader", "Pirate"];

export enum States {
  Off = "Off",
  Idle = "Idle",
  Flying = "FLying"
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

  const state: Machine<States> = createMachine<States>({
    initialState: States.Off,
    states: {
      [States.Off]: {
        transitions: {
          [Transitions.TurnOnEngine]: {
            destinationState: States.Idle,
            effect() {
              setTimeout(() => {
                turnOnLights(ship);
              }, Math.floor(Math.random() * 10000));
            }
          }
        }
      },
      [States.Idle]: {
        transitions: {
          [Transitions.FlyToRandomPoint]: {
            destinationState: States.Flying,
            effect() {
              setTimeout(() => {
                flyInRandomDirection(ship);
              }, Math.floor(Math.random() * 10000));
            }
          }
        }
      },
      [States.Flying]: {
        transitions: {
          [Transitions.TurnOffEngine]: {
            destinationState: States.Off,
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
  ship.graphics.opacity = 0.2;
  ship.body.collisionType = CollisionType.Passive;

  return ship;
};
