import { Actor, vec } from "excalibur";

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
  actor.graphics.opacity = 0.2;
};

export const turnOnLights = (actor: Actor) => {
  actor.graphics.opacity = 1;
};

const ONE_SECOND = 1000;
export const itsBeenAFewSeconds = (timeStarted: Date) => {
  const now = new Date().getTime();
  const timeDiff = now - timeStarted.getTime();

  return timeDiff > 1 * ONE_SECOND;
};
