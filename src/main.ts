import {
  Engine,
  DisplayMode,
  Color,
  PreUpdateEvent,
  CollisionStartEvent,
  PostUpdateEvent
} from "excalibur";
import { CreateShip, Ship, States, Transitions } from "./actors/ship";
import { bounceOffEdges } from "./utils";

const NUMBER_OF_SHIPS = 100;

const game = new Engine({
  displayMode: DisplayMode.FillScreen,
  backgroundColor: Color.Black
});

const setup = (game: Engine) => {
  [...Array(NUMBER_OF_SHIPS)].forEach(() => {
    const ship = CreateShip({
      x: Math.floor(Math.random() * game.drawWidth),
      y: Math.floor(Math.random() * game.drawHeight)
    });

    /**
     * Pre update events
     */
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
     * Collision Events
     */
    ship.on("collisionstart", (e: CollisionStartEvent) => {
      const ship = e.target as Ship;
      ship.state.transition(States.Flying, Transitions.TurnOffEngine);
    });

    /**
     * Post update events
     */
    ship.on("postupdate", (e: PostUpdateEvent) => {
      const ship = e.target as Ship;
      bounceOffEdges(ship, e.engine);
    });

    game.add(ship);
  });
};

setup(game);
game.start();
