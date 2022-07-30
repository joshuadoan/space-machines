import { Actor, CollisionType, Color, Engine, vec } from "excalibur";
import { nameByRace } from "fantasy-name-generator";
import { ShipSizes } from "../../../constants";

export class SpaceStation extends Actor {}

export let createSpaceStation = (game: Engine) => {
  let name = nameByRace("goblin", {
    gender: "female",
    allowMultipleNames: true
  }) as string;

  let spaceStation = new SpaceStation({
    pos: vec(Math.random() * game.drawWidth, Math.random() * game.drawHeight),
    radius: ShipSizes.Medium,
    color: Color.Orange,
    name
  });

  spaceStation.on("initialize", (e) => {
    e.target.body.collisionType = CollisionType.Passive;
    e.target.graphics.opacity = 1;
  });

  return spaceStation;
};
