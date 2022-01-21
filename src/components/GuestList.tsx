import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Ship } from "../game/actors/ship/ship";
import { Total } from "../constants";
import Tag from "./Tag";

export default function ({ ships }: { ships: Ship[] }) {
  let [searchParams] = useSearchParams();
  let filter = searchParams.get("filter");
  return (
    <ul>
      {ships.filter(ship => {
        switch (filter) {
          case "●":
            return ship.visited.length >= Total.TradeRouteDelta;
          case "◐":
            return ship.visited.length > 0;
          default:
            return true
        }

      }).map((ship, i) => (
        <li key={i} className="flex flex-wrap flex-col">
          <section className="flex gap-x-2  items-center">
            <span
              style={{
                color: ship.color.toRGBA(),
                fontSize: "1.5rem"
              }}
            >{"●"}</span>
            <Link to={`/?ship=${ship.id}`}>{ship.name}</Link>
          </section>
          <section className="flex gap-x-2 items-center">
            <span>⚡ {Math.round((100 * ship.fuel || 1) / Total.Fuel)}%</span>
            <Tag >{ship.state.value.type}</Tag>
            {
              ship.visited.length >= Total.TradeRouteDelta
                ? " ●"
                : ship.visited.length > 0
                  ? " ◐"
                  : " ◌"
            }
          </section>
        </li>
      ))}
    </ul>
  );
}
