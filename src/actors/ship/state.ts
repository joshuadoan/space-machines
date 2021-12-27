import { createMachine, State } from "../../utils";
import { Ship, ShipStates, ShipTransitions } from "./ship";
import {
  dimLights,
  flyInRandomDirection,
  turnOnLights,
  stop
} from "../actor-utils";

export const buildShipState = (ship: Ship, initialState: State<ShipStates>) =>
  createMachine<ShipStates, ShipTransitions>({
    initialState,
    states: {
      Off: {
        transitions: {
          "Turn on engine": {
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
          "Fly to random point": {
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
          "Turn off engine": {
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
