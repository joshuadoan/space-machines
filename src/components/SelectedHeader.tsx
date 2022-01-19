import React from "react";
import { Link } from "react-router-dom";
import { Total } from "../constants";
import { Ship } from "../game/actors/ship/ship";
import Tag from "./Tag";

export default function ({ selected }: {
  selected: Ship,
}) {
  return (
    <header>
      <Link to="/" className="pr-2">← back</Link>
      <span style={{
        color: selected.color.toRGBA(),
        paddingLeft: "0.25rem"
      }}>{`● `}</span>
      {selected.name}
      {[...new Array(Total.TradeRouteDelta)]
        .map((_, i) => i < selected!.visited.length
          ? " ● "
          : " ◌ ")}
      {selected.visited.length >= Total.TradeRouteDelta && <span>¤</span>}
      <Tag >{selected.state.value.type}</Tag>
      <span> ⚡ {Math.round((100 * selected.fuel) / Total.Fuel)}%</span>
    </header>
  )
}
