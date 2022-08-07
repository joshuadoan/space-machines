export type EntityType = "game";
export type Game = {
  createdAt: number;
  id: string;
  label: string;
  ships: [];
  type: EntityType;
  updatedAt: number;
};

export type GameState = { [id: string]: Game };
