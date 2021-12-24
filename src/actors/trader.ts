import { Actor, CollisionType, Color, PostUpdateEvent, vec } from "excalibur";
import { bounceOffEdges, createMachine, Machine } from "../utils";

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
  On
}

export enum Transitions {
  TurnOffEngine,
  TurnOnEngine
}

class Ship extends Actor {
  public state: any;
}

function flyInRandomDirection(actor: Actor) {
  actor.vel = vec(
    Math.floor(Math.random() * 200 - 100),
    Math.floor(Math.random() * 200 - 100)
  );
}

const stop = (actor: Actor) => {
  actor.vel = vec(0, 0);
};

const dimLights = (actor: Actor) => {
  actor.graphics.opacity = 0.2;
};

const turnOnLights = (actor: Actor) => {
  actor.graphics.opacity = 1;
};

export const MakeTrader = ({ x, y }: { x: number; y: number }) => {
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
            destinationState: States.On,
            effect() {
              turnOnLights(ship);
              setTimeout(() => {
                flyInRandomDirection(ship);
              }, Math.floor(Math.random() * 5000));
            }
          }
        }
      },
      [States.On]: {
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
  ship.on("collisionstart", () => {
    ship.state.transition(States.On, Transitions.TurnOffEngine);

    setTimeout(() => {
      ship.state.transition(States.Off, Transitions.TurnOnEngine);
    }, Math.floor(Math.random() * 10000));
  });

  /**
   * Position events
   */
  ship.on("postupdate", (e: PostUpdateEvent) => {
    // console.log(`current state: ${trader.state?.value}`);
    bounceOffEdges(ship, e.engine);
  });

  return ship;
};
