import { Color } from "excalibur";

export let ShipColors = [
  Color.DarkGray,
  Color.LightGray,
  Color.Azure,
  Color.Magenta,
  Color.Blue,
  Color.Green,
  Color.Yellow,
  Color.Chartreuse,
  Color.Violet,
  Color.Rose
];

export let FactionColors = [
  Color.Green,
  Color.LightGray,
  Color.Azure,
  Color.Magenta
];

export enum Total {
  SpaceStations = 24,
  TradeRouteDelta = Math.floor(Total.SpaceStations * 0.2),
  Ships = 16,
  Fuel = 214
}

export enum ShipSizes {
  Small = 2,
  Medium = 4,
  Large = 8
}

export enum ShipSpeed {
  Medium = 20,
  Fast = 50
}
export let LightsOpacity = {
  Off: 0.5,
  ON: 1
};
