import React from "react";
import Blockies from 'react-blockies';
import { Link, useSearchParams } from "react-router-dom";
import { Ship } from "../game/actors/ship/ship";
import { Total } from "../constants";
import Tag from "./Tag";
import Visited from "./Visited";
import Avatar from "./Avatar";

export default function ({ ships }: { ships: Ship[] }) {
  let [searchParams] = useSearchParams();
  let filter = searchParams.get("filter");
  return (
    <ul>
      {ships.length
        ? ships.map((ship, i) => {
          return (
            <li key={ship.name} className="flex flex-wrap flex-col gap-2">
              <section className="flex gap-x-2  items-center">
                <Avatar name={ship.name} color={ship.color} size={4} />
                <Link to={`/?ship=${ship.id}`}>{ship.name}</Link>
                <Tag >{ship.state.value.type}</Tag>
              </section>
              <section>
                <span>⚡ {Math.round((100 * ship.fuel) / Total.Fuel)}%</span>
                <Visited ship={ship} />
              </section>
            </li>
          )
        })
        : <li className="py-2">No results for {filter}</li>
      }
    </ul>
  );
}
