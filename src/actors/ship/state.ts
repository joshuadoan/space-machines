import { createMachine, State } from "../../utils";
import { Ship, ShipStates, ShipTransitions } from "./ship";
import {
  dimLights,
  flyInRandomDirection,
  turnOnLights,
  stop
} from "../actor-utils";

type Off = "Off";
type Idle = "Idle";
type Flying = "Flying";
export type ShipStates = Off | Idle | Flying;

type TurnOffEngine = "Turn off engine";
type TurnOnEngine = "Turn on engine";
type FlyToRandomPoint = "Fly to random point";
export type ShipTransitions = TurnOffEngine | TurnOnEngine | FlyToRandomPoint;

export const buildShipState = (ship: Ship) =>
  createMachine<ShipStates, ShipTransitions>({
    initialState: {
      type: "Off",
      at: new Date()
    },
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
