import React from "react";
import { Link } from "react-router-dom";
import { Ship } from "../game/actors/ship/ship";
import { Total } from "../constants";
import Tag from "./Tag";

export default function ({ ships }: { ships: Ship[] }) {
  return (
    <ul>
      {ships.map((ship, i) => (
        <li key={i} className="flex gap-2 flex-wrap">
          <span
            style={{
              color: ship.color.toRGBA(),
              paddingLeft: "0.25rem"
            }}
          >{`●`}</span>
          <Link to={`/?ship=${ship.id}`}>{ship.name}</Link>
          <Tag >{ship.state.value.type}</Tag>
          <span> ⚡ {Math.round((100 * ship.fuel) / Total.Fuel)}%</span>
          {ship.visited.length >= Total.TradeRouteDelta ? "●" : "◌"}
        </li>
      ))}
    </ul>
  );
}
