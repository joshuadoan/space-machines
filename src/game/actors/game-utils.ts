import { Actor, Font, FontUnit, Label, vec, Vector } from "excalibur";
import { nameByRace } from "fantasy-name-generator";
import { LightsOpacity, ShipSpeed } from "../../constants";
import { Game } from "../game";
import { Ship } from "./ship/ship";

export function flyTo(ship: Ship, pos: Vector) {
  ship.actions.moveTo(pos, ShipSpeed.Fast);
}

export function getRandomScreenPosition(ship: Ship) {
  return vec(
    Math.floor(Math.random() * ship.scene.engine.drawWidth),
    Math.floor(Math.random() * ship.scene.engine.drawHeight)
  );
}

export function logJournal(ship: Ship, message: string) {
  ship.journal.unshift({
    at: new Date(),
    message
  });
}

export function createLabel(actor: Actor) {
  return new Label({
    text: `✨`,
    pos: vec(actor.width, -actor.height / 2),
    font: new Font({
      size: 0.5,
      unit: FontUnit.Rem,
      color: actor.color
    })
  });
}

export function removeAllLabels(ships: Ship[]) {
  ships.forEach((s) => s.removeAllChildren());
}

export function addLabel(ship: Ship) {
  let label = createLabel(ship);
  ship.addChild(label);
}

export function zoomToActor(game: Game, actor: Actor) {
  game.currentScene.camera.strategy.elasticToActor(actor, 0.2, 0.2);
  game.currentScene.camera.zoomOverTime(2, 200);
}

export function resetCamera(game: Game) {
  game.currentScene.camera.clearAllStrategies();
  game.currentScene.camera.x = game.drawWidth;
  game.currentScene.camera.y = game.drawHeight;
  game.currentScene.camera.zoomOverTime(1, 200);
}

export function plotTradeRoute(ship: Ship) {
  ship.visited.forEach((pos) => {
    ship.actions.moveTo(pos, ShipSpeed.Medium);
  });
}

export function hasReachedDestination(ship: Ship) {
  return ship.actions.getQueue().isComplete();
}

export function stop(ship: Ship) {
  ship.actions.clearActions();
}

export function dimLights(actor: Actor) {
  actor.graphics.opacity = LightsOpacity.Off;
}

export function turnOnLights(actor: Actor) {
  actor.graphics.opacity = LightsOpacity.ON;
}

export function logLocation(ship: Ship, pos: Vector) {
  if (!ship.visited.some((v) => v === pos)) {
    ship.visited.push(pos);
  }
}

export function generateName() {
  let firstName = nameByRace("halfling", {
    gender: "female"
  }) as string;

  let lastName = nameByRace("elf", {
    gender: "female"
  }) as string;
  return {
    firstName,
    lastName
  };
}

export function randomFromArray(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function itsBeenAFewSeconds(timeStarted?: Date) {
  if (!timeStarted) return false;
  let now = new Date().getTime();
  let timeDiff = now - timeStarted.getTime();
  let seconds = Math.floor(Math.random() * 1000);

  return timeDiff > seconds * 1000;
}
