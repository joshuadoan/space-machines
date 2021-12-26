import { Actor, Engine, vec } from "excalibur";
import { LightsOpacity } from "./constants";

export const flyInRandomDirection = (actor: Actor) => {
  actor.vel = vec(
    Math.floor(Math.random() * 200 - 100),
    Math.floor(Math.random() * 200 - 100)
  );
};

export const stop = (actor: Actor) => {
  actor.vel = vec(0, 0);
};

export const dimLights = (actor: Actor) => {
  actor.graphics.opacity = LightsOpacity.OFF;
};

export const turnOnLights = (actor: Actor) => {
  actor.graphics.opacity = LightsOpacity.ON;
};

const ONE_SECOND = 1000;
export const itsBeenAFewSeconds = (timeStarted: Date) => {
  const now = new Date().getTime();
  const timeDiff = now - timeStarted.getTime();

  return timeDiff > 1 * ONE_SECOND;
};

export const bounceOffEdges = (actor: Actor, game: Engine) => {
  // If the ball collides with the left side
  // of the screen reverse the x velocity
  if (actor.pos.x + 20 < actor.width / 2) {
    actor.vel.x *= -1;
  }

  // If the ball collides with the right side
  // of the screen reverse the x velocity
  if (actor.pos.x - 20 > game.drawWidth + 20) {
    actor.vel.x *= -1;
  }

  // If the ball collides with the top
  // of the screen reverse the y velocity
  if (actor.pos.y < -20) {
    actor.vel.y *= -1;
  }

  // If the ball collides with the bottom
  // of the screen reverse the y velocity
  if (actor.pos.y - 20 > game.drawHeight) {
    actor.vel.y *= -1;
  }
};
