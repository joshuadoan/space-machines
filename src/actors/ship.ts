import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  PostUpdateEvent,
  PreUpdateEvent
} from "excalibur";
import { Machine } from "../utils";
import { bounceOffEdges, itsBeenAFewSeconds } from "./actor-utils";
import { radius, ShipColors, ShipNames } from "./constants";
import { buildShipState } from "./state";

type Off = "Off";
type Idle = "Idle";
type Flying = "Flying";
export type ShipStates = Off | Idle | Flying;

type TurnOffEngine = "Turn off engine";
type TurnOnEngine = "Turn on engine";
type FlyToRandomPoint = "Fly to random point";
export type ShipTransitions = TurnOffEngine | TurnOnEngine | FlyToRandomPoint;

export class Ship extends Actor {
  public state: any;
}

export const CreateShip = ({ x, y }: { x: number; y: number }) => {
  const ship = new Ship({
    x,
    y,
    radius,
    name: ShipNames[Math.floor(Math.random() * ShipNames.length)],
    color: ShipColors[Math.floor(Math.random() * ShipColors.length)]
  });

  ship.body.collisionType = CollisionType.Passive;
  ship.graphics.opacity = 0.2;

  const state: Machine<ShipStates, ShipTransitions> = buildShipState(ship);
  ship.state = state;

  const handleUpdate = (e: PreUpdateEvent) => {
    const ship = e.target as Ship;
    const stateMachine = ship.state as Machine<ShipStates, ShipTransitions>;

    switch (stateMachine.value.type) {
      case "Off": {
        if (itsBeenAFewSeconds(stateMachine.value.at)) {
          stateMachine.transition(stateMachine.value, "Turn on engine");
        }
        break;
      }
      case "Idle": {
        if (itsBeenAFewSeconds(stateMachine.value.at)) {
          stateMachine.transition(stateMachine.value, "Fly to random point");
        }
        break;
      }
    }
  };

  const handleCollision = (e: CollisionStartEvent) => {
    const ship = e.target as Ship;
    const stateMachine = ship.state as Machine<ShipStates, ShipTransitions>;

    if (stateMachine.value.type === "Flying") {
      stateMachine.transition(stateMachine.value, "Turn off engine");
    }
  };

  const handlePostUpdate = (e: PostUpdateEvent) => {
    const ship = e.target as Ship;
    bounceOffEdges(ship, e.engine);
  };

  ship.on("preupdate", handleUpdate);
  ship.on("collisionstart", handleCollision);
  ship.on("postupdate", handlePostUpdate);

  return ship;
};
