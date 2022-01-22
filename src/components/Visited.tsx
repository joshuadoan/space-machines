import React from "react";
import { Total } from "../constants";
import { Ship } from "../game/actors/ship/ship";

export default function ({ ship }: {
  ship: Ship,
}) {
  return (
    <span>

      {[...new Array(Total.TradeRouteDelta)]
        .map((_, i) => i < ship!.visited.length
          ? " ● "
          : " ◌ ")}
    </span>
  )
}
