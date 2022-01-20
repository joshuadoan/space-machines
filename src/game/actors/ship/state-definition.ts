import { Ship } from "./ship";
import {
  dimLights,
  flyTo,
  turnOnLights,
  stop,
  logLocation,
  plotTradeRoute,
  getRandomScreenPosition
} from "../../../game-utils";
import {
  StateDefinition,
  StateMachineDefinition,
  TransitionDefinition
} from "./createMachine";
import { SpaceStation } from "../space-station/space-station";
import { Total } from "../../../constants";

export type Off = "Off";
export type Idle = "Idle";
export type Exploring = "Exploring";
export type Visiting = "Visiting";
export type OnRoute = "On a trade route";

export type ShipStates = Off | Idle | Exploring | Visiting | OnRoute;

export type TurnOffEngine = "Turn Off engine";
export type TurnOnEngine = "Turn on engine";
export type FlyToRandomPoint = "Fly to random point";
export type BeginRoute = "Begin route";
export type Visit = "Visit";
export type Leave = "Leave";
export type Recharge = "Recharge";

export type ShipTransitions =
  | TurnOffEngine
  | TurnOnEngine
  | FlyToRandomPoint
  | Visit
  | BeginRoute
  | Leave
  | Recharge;

export let createStateMachineDefinition = (
  ship: Ship,
  initialState: StateDefinition
): StateMachineDefinition => {
  let TurnOffEngine: TransitionDefinition = {
    to: { type: "Off" },
    effect() {
      stop(ship);
      dimLights(ship);
    }
  };

  let Recharge: TransitionDefinition = {
    to: { type: "Off" },
    effect() {
      ship.fuel = Total.Fuel;
      ship.visited = [];
    }
  };

  let Visit: TransitionDefinition = {
    to: { type: "Visiting" },
    effect(other) {
      stop(ship);
      dimLights(ship);
      if (other instanceof SpaceStation) {
        ship.fuel--;
      }

      if (ship.visited.length < Total.TradeRouteDelta) {
        logLocation(ship, other.pos);
      }
    }
  };

  let Leave: TransitionDefinition = {
    to: { type: "Idle" },
    effect() {
      ship.fuel--;
      turnOnLights(ship);
    }
  };

  let TurnOnEngine: TransitionDefinition = {
    to: { type: "Idle" },
    effect() {
      turnOnLights(ship);
    }
  };

  let FlyToRandomPoint: TransitionDefinition = {
    to: { type: "Exploring" },
    effect() {
      let pos = getRandomScreenPosition(ship);
      flyTo(ship, pos);
    }
  };

  let BeginRoute: TransitionDefinition = {
    to: { type: "On a trade route" },
    effect() {
      plotTradeRoute(ship);
    }
  };

  return {
    initialState,
    states: {
      Off: {
        transitions: {
          "Turn on engine": TurnOnEngine
        }
      },
      Visiting: {
        transitions: {
          Leave
        }
      },
      Idle: {
        transitions: {
          "Fly to random point": FlyToRandomPoint,
          "Begin route": BeginRoute
        }
      },
      Exploring: {
        transitions: {
          "Turn Off engine": TurnOffEngine,
          Recharge,
          Visit
        }
      },
      "On a trade route": {
        transitions: {
          Visit,
          Recharge
        }
      }
    }
  };
};
