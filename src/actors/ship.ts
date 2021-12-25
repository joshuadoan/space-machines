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

export const radius = 4;
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

  /**
   * Collision Events
   */
  ship.on("collisionstart", (e: CollisionStartEvent) => {
    const ship = e.target as Ship;
    ship.state.transition(States.Flying, Transitions.TurnOffEngine);
  });

  ship.on("preupdate", (e: PreUpdateEvent) => {
    const ship = e.target as Ship;

    switch (ship.state.value as States) {
      case States.Off: {
        ship.state.transition(States.Off, Transitions.TurnOnEngine);
        break;
      }
      case States.Idle: {
        ship.state.transition(States.Idle, Transitions.FlyToRandomPoint);
        break;
      }
    }
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
