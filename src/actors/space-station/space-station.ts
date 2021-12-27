import { Actor, CollisionType, Color, vec } from "excalibur";

import { radius } from "../constants";

export class SpaceStation extends Actor {}

export const createSpaceStation = ({ x, y }: { x: number; y: number }) => {
  const spaceStation = new SpaceStation({
    pos: vec(x, y),
    radius,
    color: Color.Green
  });

  spaceStation.body.collisionType = CollisionType.Passive;

  return spaceStation;
};
