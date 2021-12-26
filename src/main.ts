import { Engine, DisplayMode, Color } from "excalibur";
import { NUMBER_OF_SHIPS } from "./actors/constants";
import { createShip } from "./actors/ship/ship";

const game = new Engine({
  displayMode: DisplayMode.FillScreen,
  backgroundColor: Color.Black
});

[...Array(NUMBER_OF_SHIPS)].forEach(() => {
  game.add(
    createShip({
      x: Math.floor(Math.random() * game.drawWidth),
      y: Math.floor(Math.random() * game.drawHeight)
    })
  );
});

game.start();
