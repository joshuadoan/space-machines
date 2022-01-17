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
import { buildShipState, ShipStates, ShipTransitions } from "./state";

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
  ship.state = buildShipState(ship);

  ship.on("preupdate", handleUpdate);
  ship.on("collisionstart", handleCollision);
  ship.on("postupdate", handlePostUpdate);

  function handleUpdate(e: PreUpdateEvent) {
    const ship = e.target as Ship;
    const state = ship.state as Machine<ShipStates, ShipTransitions>;
    const randomNumber = Math.floor(Math.random() * 1000);

    switch (state.value.type) {
      case "Off": {
        if (itsBeenAFewSeconds(state.value.at, randomNumber)) {
          state.transition(state.value, "Turn on engine");
        }
        break;
      }
      case "Idle": {
        if (itsBeenAFewSeconds(state.value.at, randomNumber)) {
          state.transition(state.value, "Fly to random point");
        }
        break;
      }
    }
  }

  function handleCollision(e: CollisionStartEvent) {
    const ship = e.target as Ship;
    if (!(e.other instanceof SpaceStation)) return;

    const state = ship.state as Machine<ShipStates, ShipTransitions>;
    if (state.value.type === "Flying") {
      state.transition(state.value, "Turn off engine");
    }
  }

  function handlePostUpdate(e: PostUpdateEvent) {
    const ship = e.target as Ship;
    bounceOffEdges(ship, e.engine);
  }

  return ship;
};
