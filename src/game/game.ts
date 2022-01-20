import { Engine, DisplayMode, Color } from "excalibur";
import { TransitionDefinition } from "../createMachine";

export class Game extends Engine {
  constructor() {
    super({
      displayMode: DisplayMode.FillContainer,
      backgroundColor: Color.Black,
      canvasElementId: "game"
    });
  }
  /**
   * @param selectedActor Used for storing the selected actor
   */
  public selectedActor: number;

  /**
   * @param activeIndex Used for cycling through selected ships
   */
  public activeIndex: number;

  /**
   * @param bannerMessage Used for cycling through selected ships
   */
  public alerts: {
    [key in string]: string | TransitionDefinition;
  };
}

export function createGame() {
  let game = new Game();
  return game;
}
