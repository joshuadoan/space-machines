import { Color, Engine, Label, Input, PreUpdateEvent, Vector } from "excalibur";

export class Button extends Label {}

export let createButton = ({
  text,
  game,
  onClick,
  onUpdate,
  pos
}: {
  game: Engine;
  text: string;
  onClick?: (e: Input.PointerEvent, button: Button) => void;
  onUpdate?: (e: PreUpdateEvent, button: Button) => void;
  pos?: Vector;
}) => {
  let button = new Button({
    text,
    x: pos?.x || 20,
    y: pos?.y || game.drawHeight - 36,
    width: 550,
    height: 28
  });
  button.color = Color.Orange;
  button.font.size = 18;

  button.on("pointerdown", (e) => onClick?.(e, button));
  button.on("preupdate", (e) => onUpdate?.(e, button));

  return button;
};
