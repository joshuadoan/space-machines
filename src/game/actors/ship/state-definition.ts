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
  Transitions
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
  let turnOnEngine: Transitions = {
    "Turn on engine": {
      to: { type: "Idle" },
      effect() {
        turnOnLights(ship);
      }
    }
  };

  let leave: Transitions = {
    Leave: {
      to: { type: "Idle" },
      effect() {
        ship.fuel--;
        turnOnLights(ship);
      }
    }
  };

  let flyToRandomPlace: Transitions = {
    "Fly to random point": {
      to: { type: "Exploring" },
      effect() {
        let pos = getRandomScreenPosition(ship);
        flyTo(ship, pos);
      }
    }
  };

  let startTradeRoute: Transitions = {
    "Begin route": {
      to: { type: "On a trade route" },
      effect() {
        plotTradeRoute(ship);
      }
    }
  };

  let turnOffEngine: Transitions = {
    "Turn Off engine": {
      to: { type: "Off" },
      effect() {
        stop(ship);
        dimLights(ship);
      }
    }
  };

  let recharge: Transitions = {
    Recharge: {
      to: { type: "Off" },
      effect() {
        ship.fuel = Total.Fuel;
        ship.visited = [];
      }
    }
  };

  let visit: Transitions = {
    Visit: {
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
    }
  };

  return {
    initialState,
    states: {
      Off: {
        transitions: {
          ...turnOnEngine
        }
      },
      Visiting: {
        transitions: {
          ...leave
        }
      },
      Idle: {
        transitions: {
          ...flyToRandomPlace,
          ...startTradeRoute
        }
      },
      Exploring: {
        transitions: {
          ...turnOffEngine,
          ...recharge,
          ...visit
        }
      },
      "On a trade route": {
        transitions: {
          ...visit,
          ...recharge
        }
      }
    }
  };
};
