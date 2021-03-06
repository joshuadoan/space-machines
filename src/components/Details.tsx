import React from "react";
import { Link } from "react-router-dom";
import { Total } from "../constants";
import { Ship } from "../game/actors/ship/ship";
import Avatar from "./Avatar";
import Tag from "./Tag";
import Visited from "./Visited";

export default function ({ ship }: { ship: Ship }) {
  return (
    <span className="flex flex-1 gap-2 items-center">
      <Link to={""} className="pr-2">←</Link>
      <Avatar name={ship.name} color={ship.color} />
      <span className="hidden md:block">{ship.name}</span>
      <Visited ship={ship} />
      <Tag >{ship.state.value.type}</Tag>
      <span className="hidden md:block">{Math.round(ship.pos.x)}° {Math.round(ship.pos.y)}°</span>
      <span className="hidden md:block">⚡ {Math.round((100 * ship.fuel) / Total.Fuel)}%</span>
    </span>
  )
}
