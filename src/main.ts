import { Engine, DisplayMode, Color } from "excalibur";
import { MakeTrader } from "./actors/trader";

const game = new Engine({
  displayMode: DisplayMode.FillScreen,
  backgroundColor: Color.Black
});

[...Array(100)].forEach(() => {
  const trader = MakeTrader({
    x: Math.floor(Math.random() * game.drawWidth),
    y: Math.floor(Math.random() * game.drawHeight)
  });

  game.add(trader);
  trader.state.transition("off", "TURN_ON");
});

game.start();
