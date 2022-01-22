import React from "react";
import Blockies from 'react-blockies';
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
        ? ships.map((ship, i) => {
          if (!ship.fuel) return;
          return (
            <li key={i} className="flex flex-wrap flex-col">
              <section className="flex gap-x-2  items-center">
                <Blockies
                  className="blockie"
                  seed={ship.name}
                  size={4}
                  color={ship.color.toRGBA()} />
                <Link to={`/?ship=${ship.id}`}>{ship.name}</Link>
                <Tag >{ship.state.value.type}</Tag>
              </section>
              <section>
                <span>⚡ {Math.round((100 * ship.fuel) / Total.Fuel)}%</span>
                {[...new Array(Total.TradeRouteDelta)]
                  .map((_, i) => i < ship.visited.length
                    ? " ● "
                    : " ◌ ")}
              </section>
            </li>
          )
        })
        : <li className="py-2">No results for {filter}</li>
      }
    </ul>
  );
}
