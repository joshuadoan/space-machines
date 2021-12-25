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

    /**
     * Pre update events
     */
    ship.on("preupdate", (e: PreUpdateEvent) => {
      const ship = e.target as Ship;
      const state = ship.stateMachine.value as State;
      const now = new Date().getTime();
      const actionStartedTime = state.at ? state.at.getTime() : now;
      const timeDiff = now - actionStartedTime;

      switch (state.type) {
        case "Off": {
          if (timeDiff > 1 * ONE_SECOND || !state.at) {
            ship.stateMachine.transition(
              {
                type: States.Off
              },
              Transitions.TurnOnEngine
            );
          }
          break;
        }
        case "Idle": {
          if (timeDiff > 1 * ONE_SECOND || !state.at) {
            ship.stateMachine.transition(
              {
                type: States.Idle
              },
              Transitions.FlyToRandomPoint
            );
          }

          break;
        }
      }
    });

    /**
     * Collision Events
     */
    ship.on("collisionstart", (e: CollisionStartEvent) => {
      const ship = e.target as Ship;
      ship.stateMachine.transition(
        {
          type: States.Flying
        },
        Transitions.TurnOffEngine
      );
    });

    game.add(ship);
  });
};

setup(game);
game.start();
