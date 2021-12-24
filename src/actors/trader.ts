import { Actor, CollisionType, Color, PostUpdateEvent, vec } from "excalibur";
import { bounceOffEdges, createMachine } from "../utils";

// Create a ball at pos (100, 300) to start
export const ShipColors = [
  Color.DarkGray,
  Color.LightGray,
  Color.Azure,
  Color.Magenta
];

class Trader extends Actor {
  public state: any;
}

function flyInRandomDirection(actor: Actor) {
  actor.vel = vec(
    Math.floor(Math.random() * 200 - 100),
    Math.floor(Math.random() * 200 - 100)
  );
}

const flyToRandomPoint = (actor: Actor) => {
  setTimeout(() => {
    flyInRandomDirection(actor);
    actor.graphics.opacity = 1;
  }, Math.floor(Math.random() * 5000));
};

const stop = (actor: Actor) => {
  actor.vel = vec(0, 0);
};

const dimLights = (actor: Actor) => {
  actor.graphics.opacity = 0.2;
};

export const MakeTrader = ({ x, y }: { x: number; y: number }) => {
  const trader = new Trader({
    x,
    y,
    radius: 2,
    name: ["Trader", "Pirate"][
      Math.floor(Math.random() * ["Trader", "Pirate"].length)
    ],
    color: ShipColors[Math.floor(Math.random() * ShipColors.length)]
  });

  trader.graphics.opacity = 0.2;

  trader.state = createMachine({
    initialState: "off",
    states: {
      off: {
        links: {
          TURN_ON: {
            target: "on",
            effect() {
              flyToRandomPoint(trader);
            }
          }
        }
      },
      on: {
        links: {
          TURN_OFF: {
            target: "off",
            effect() {
              stop(trader);
              dimLights(trader);
            }
          }
        }
      }
    }
  });

  trader.body.collisionType = CollisionType.Passive;

  trader.on("collisionstart", () => {
    trader.state.transition("on", "TURN_OFF");
  });

  trader.on("postupdate", (e: PostUpdateEvent) => {
    // console.log(`current state: ${trader.state?.value}`);
    bounceOffEdges(trader, e.engine);
  });

  return trader;
};
