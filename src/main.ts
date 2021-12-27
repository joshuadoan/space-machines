import { Engine, DisplayMode, Color } from "excalibur";
import { NUMBER_OF_SHIPS } from "./actors/constants";
import { createShip } from "./actors/ship/ship";
import { createSpaceStation } from "./actors/space-station/space-station";

const game = new Engine({
  displayMode: DisplayMode.FillScreen,
  backgroundColor: Color.Black
});

[...Array(10)].forEach(() => {
  game.add(
    createSpaceStation({
      x: Math.floor(Math.random() * game.drawWidth),
      y: Math.floor(Math.random() * game.drawHeight)
    })
  );
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
