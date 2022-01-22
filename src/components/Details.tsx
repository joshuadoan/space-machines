import React from "react";
import Blockies from 'react-blockies';
import { Link } from "react-router-dom";
import { Total } from "../constants";
import { Ship } from "../game/actors/ship/ship";
import Tag from "./Tag";

export default function ({ selected }: {
  selected: Ship,
}) {
  // console.log(Object.entries(selected.snack).map(foo => foo))
  return (
    <>
      <Link to="/" className="pr-2">←</Link>
      <Blockies
        className="blockie"
        seed={selected.name}
        size={8}
        color={selected.color.toRGBA()} />
      {selected.name}
      {[...new Array(Total.TradeRouteDelta)]
        .map((_, i) => i < selected!.visited.length
          ? " ● "
          : " ◌ ")}
      {selected.visited.length >= Total.TradeRouteDelta && <span>¤</span>}
      <Tag >{selected.state.value.type}</Tag>
      <span>{Math.round(selected.pos.x)}° {Math.round(selected.pos.y)}°</span>
      <span>⚡ {Math.round((100 * selected.fuel) / Total.Fuel)}%</span>
    </>
  )
}
