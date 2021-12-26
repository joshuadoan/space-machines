import { createMachine } from "../utils";
import { Ship, ShipStates, Transitions } from "./ship";
import {
  dimLights,
  flyInRandomDirection,
  turnOnLights,
  stop
} from "./actor-utils";

export const buildShipState = (ship: Ship) =>
  createMachine<ShipStates>({
    initialState: {
      type: "Off",
      at: new Date()
    },
    states: {
      Off: {
        transitions: {
          [Transitions.TurnOnEngine]: {
            nextState: {
              type: "Idle",
              at: new Date()
            },
            effect() {
              turnOnLights(ship);
            }
          }
        }
      },
      Idle: {
        transitions: {
          [Transitions.FlyToRandomPoint]: {
            nextState: {
              type: "Flying",
              at: new Date()
            },
            effect() {
              flyInRandomDirection(ship);
            }
          }
        }
      },
      Flying: {
        transitions: {
          [Transitions.TurnOffEngine]: {
            nextState: {
              type: "Off",
              at: new Date()
            },
            effect() {
              stop(ship);
              dimLights(ship);
            }
          }
        }
      }
    }
  });
