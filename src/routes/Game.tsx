import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { v4 as useId } from "uuid";
import { Link } from "react-router-dom";
import {
  uniqueNamesGenerator,
  Config,
  colors,
  names,
} from "unique-names-generator";
const config: Config = {
  dictionaries: [colors, names],
  separator: " ",
  style: "lowerCase",
};


export let Game = () => {
  const params = useParams();
  return <p>game {params.gameId}</p>;
};
