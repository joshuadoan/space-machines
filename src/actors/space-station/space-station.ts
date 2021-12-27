import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  vec
} from "excalibur";
import { radius } from "../constants";
import { Ship } from "../ship/ship";

export class SpaceStation extends Actor {}

export const createSpaceStation = ({ x, y }: { x: number; y: number }) => {
  const spaceStation = new SpaceStation({
    pos: vec(x, y),
    radius: radius * 1.5,
    color: Color.Orange
  });

  spaceStation.body.collisionType = CollisionType.Passive;
  spaceStation.graphics.opacity = 1;

  return spaceStation;
};
