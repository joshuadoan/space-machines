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
      {ships.length
        ? ships.map((ship, i) => (
          <li key={i} className="flex flex-wrap flex-col">
            <section className="flex gap-x-2  items-center">
              <span
                style={{
                  color: ship.color.toRGBA(),
                  fontSize: "1.5rem"
                }}
              >{"●"}</span>
              <Link to={`/?ship=${ship.id}`}>{ship.name}</Link>
              <Tag >{ship.state.value.type}</Tag>
            </section>
            <section>
              <span>⚡ {Math.round((100 * ship.fuel || 1) / Total.Fuel)}%</span>
              {[...new Array(Total.TradeRouteDelta)]
                .map((_, i) => i < ship.visited.length
                  ? " ● "
                  : " ◌ ")}
            </section>
          </li>
        ))
        : <li className="py-2">No results for {filter}</li>
      }
    </ul>
  );
}
