import { Actor, CollisionType, Color, vec } from "excalibur";

import { radius } from "../constants";

export class SpaceStation extends Actor {}

export const createSpaceStation = ({ x, y }: { x: number; y: number }) => {
  const spaceStation = new SpaceStation({
    pos: vec(x, y),
    radius: 5,
    color: Color.Orange,
    name: "space-station"
  });

  spaceStation.body.collisionType = CollisionType.Passive;

  return spaceStation;
};
