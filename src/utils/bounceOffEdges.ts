import { Actor, Engine } from "excalibur";

export const bounceOffEdges = (actor: Actor, game: Engine) => {
  // If the ball collides with the left side
  // of the screen reverse the x velocity
  if (actor.pos.x - 20 < actor.width / 2) {
    actor.vel.x *= -1;
  }

  // If the ball collides with the right side
  // of the screen reverse the x velocity
  if (actor.pos.x > game.drawWidth + 20) {
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
