import { Engine, DisplayMode, Color } from "excalibur";
import { MakeTrader, States, Transitions } from "./actors/trader";

const NUMBER_OF_SHIPS = 100;

const game = new Engine({
  displayMode: DisplayMode.FillScreen,
  backgroundColor: Color.Black
});

const setup = (game: Engine) => {
  [...Array(NUMBER_OF_SHIPS)].forEach(() => {
    const trader = MakeTrader({
      x: Math.floor(Math.random() * game.drawWidth),
      y: Math.floor(Math.random() * game.drawHeight)
    });

    game.add(trader);

    setTimeout(() => {
      trader.state.transition(States.Off, Transitions.TurnOnEngine);
    }, Math.floor(Math.random() * 5000));
  });
};

setup(game);
game.start();
