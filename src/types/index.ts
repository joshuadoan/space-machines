export type EntityType = "game";
export type Game = {
  type: EntityType;
  id: string;
  ships: [];
  label?: string;
};

export type GameState = { [id: string]: Game };
