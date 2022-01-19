import React from "react";
import { Ship } from "../game/actors/ship/ship";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import { Total } from "../constants";

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
          <Tag ship={ship} />
          <span>
            {[...new Array(Total.TradeRouteDelta)]
              .map((_, i) => i < ship.visited.length
                ? " ●"
                : " ◌")}
          </span>
          {ship.visited.length >= Total.TradeRouteDelta && <span>¤</span>}
        </li>
      ))}
    </ul>
  );
}
