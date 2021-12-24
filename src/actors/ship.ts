import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  PostUpdateEvent
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

export const radius = 4;
export const ShipNames = ["Trader", "Pirate"];

export enum States {
  Off,
  Idle,
  Flying
}

export enum Transitions {
  TurnOffEngine,
  TurnOnEngine,
  FlyToRandomPoint
}
class Ship extends Actor {
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
              turnOnLights(ship);
            }
          }
        }
      },
      [States.Idle]: {
        transitions: {
          [Transitions.FlyToRandomPoint]: {
            destinationState: States.Flying,
            effect() {
              flyInRandomDirection(ship);
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

  /**
   * Collision Events
   */
  ship.on("collisionstart", (e: CollisionStartEvent) => {
    const ship = e.target as Ship;
    ship.state.transition(ship.state.value, Transitions.TurnOffEngine);

    setTimeout(() => {
      ship.state.transition(ship.state.value, Transitions.TurnOnEngine);
      ship.state.transition(ship.state.value, Transitions.FlyToRandomPoint);
    }, Math.floor(Math.random() * 10000));
  });

  /**
   * Post update events
   */
  ship.on("postupdate", (e: PostUpdateEvent) => {
    const ship = e.target as Ship;
    bounceOffEdges(ship, e.engine);
  });

  return ship;
};
