import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  PostUpdateEvent,
  PreUpdateEvent,
  vec
} from "excalibur";
import { Machine, State } from "../../utils";
import { bounceOffEdges, itsBeenAFewSeconds } from "../actor-utils";
import { LightsOpacity, radius, ShipColors } from "../constants";
import { SpaceStation } from "../space-station/space-station";
import { buildShipState } from "./state";

type Off = "Off";
type Idle = "Idle";
type Flying = "Flying";
export type ShipStates = Off | Idle | Flying;

type TurnOffEngine = "Turn off engine";
type TurnOnEngine = "Turn on engine";
type FlyToRandomPoint = "Fly to random point";
export type ShipTransitions = TurnOffEngine | TurnOnEngine | FlyToRandomPoint;

const initialState: State<ShipStates> = {
  type: "Off",
  at: new Date()
};
export class Ship extends Actor {
  public state: Machine<ShipStates, ShipTransitions> = {
    value: initialState,
    transition: () => initialState
  };
}

export const createShip = ({ x, y }: { x: number; y: number }) => {
  const ship = new Ship({
    pos: vec(x, y),
    radius,
    color: ShipColors[Math.floor(Math.random() * ShipColors.length)]
  });

  ship.body.collisionType = CollisionType.Passive;
  ship.graphics.opacity = LightsOpacity.OFF;

  const state: Machine<ShipStates, ShipTransitions> = buildShipState(
    ship,
    initialState
  );
  ship.state = state;

  ship.on("preupdate", handleUpdate);
  ship.on("collisionstart", handleCollision);
  ship.on("postupdate", handlePostUpdate);

  function handleUpdate(e: PreUpdateEvent) {
    const ship = e.target as Ship;
    const stateMachine = ship.state as Machine<ShipStates, ShipTransitions>;

    switch (stateMachine.value.type) {
      case "Off": {
        if (
          itsBeenAFewSeconds(
            stateMachine.value.at,
            Math.floor(Math.random() * 1000)
          )
        ) {
          stateMachine.transition(stateMachine.value, "Turn on engine");
        }
        break;
      }
      case "Idle": {
        if (itsBeenAFewSeconds(stateMachine.value.at, 1)) {
          stateMachine.transition(stateMachine.value, "Fly to random point");
        }
        break;
      }
    }
  }

  function handleCollision(e: CollisionStartEvent) {
    const other = e.other;
    if (!(other instanceof SpaceStation)) return;

    const self = e.target as Ship;

    const stateMachine = self.state as Machine<ShipStates, ShipTransitions>;
    if (stateMachine.value.type !== "Flying") return;

    stateMachine.transition(stateMachine.value, "Turn off engine");
  }

  function handlePostUpdate(e: PostUpdateEvent) {
    const ship = e.target as Ship;
    bounceOffEdges(ship, e.engine);
  }

  return ship;
};
