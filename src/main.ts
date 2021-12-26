import {
  Engine,
  DisplayMode,
  Color,
  PreUpdateEvent,
  CollisionStartEvent
} from "excalibur";
import { CreateShip, Ship, States, Transitions } from "./actors/ship";
import { State } from "./utils";

const NUMBER_OF_SHIPS = 100;
const ONE_SECOND = 1000;

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

    ship.on("preupdate", (e: PreUpdateEvent) => {
      const ship = e.target as Ship;
      const state = ship.state.value as State;

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
      const state = ship.state.value as State;

      if (state.type === States.Flying) {
        ship.state.transition(state, Transitions.TurnOffEngine);
      }
    });

    game.add(ship);
  });
};

setup(game);
game.start();
