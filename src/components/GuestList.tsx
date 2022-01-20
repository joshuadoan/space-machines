import React from "react";
import { Link } from "react-router-dom";
import { Ship } from "../game/actors/ship/ship";
import { Total } from "../constants";
import Tag from "./Tag";

export default function ({ ships }: { ships: Ship[] }) {
  return (
    <ul>
      {ships.map((ship, i) => (
        <li key={i} className="flex gap-1 flex-wrap flex-col">
          <section className="flex gap-2 flex-wrap items-center">
            <span
              style={{
                color: ship.color.toRGBA()
              }}
            >{`●`}</span>
            <Link to={`/?ship=${ship.id}`}>{ship.name}</Link>
          </section>
          <section className="flex gap-2 flex-wrap items-center">
            {ship.visited.length >= Total.TradeRouteDelta ? "●" : ship.visited.length > Total.TradeRouteDelta / 2 ? "◐" : "◌"}
            <span>⚡{Math.round((100 * ship.fuel || 1) / Total.Fuel)}%</span>
            <Tag >{ship.state.value.type}</Tag>
          </section>
        </li>
      ))}
    </ul>
  );
}
