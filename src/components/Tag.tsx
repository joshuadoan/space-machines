import React from "react";
import { Ship } from "../game/actors/ship/ship";

export default function ({ ship }: {
  ship: Ship
}) {
  return (<span className="bg-orange-400 text-black font-bold mx-1.5  px-1 h-fit">
    {ship.state.value.type}
  </span>)
}
