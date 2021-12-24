import { Engine, DisplayMode, Color } from "excalibur";
import { CreateShip, States, Transitions } from "./actors/ship";

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

    game.add(ship);

    setTimeout(() => {
      ship.state.transition(States.Off, Transitions.TurnOnEngine);
    }, Math.floor(Math.random() * 5000));

    ship.state.transition(States.Idle, Transitions.FlyToRandomPoint);
  });
};

setup(game);
game.start();
