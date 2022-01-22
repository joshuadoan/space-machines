import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SortKeys } from "../game-utils";

export default function (props: { children?: JSX.Element | JSX.Element[] }) {
  let [searchParams] = useSearchParams();
  let sort = searchParams.get("sort") as SortKeys;

  return (
    <nav className="flex gap-2">
      <Link to={`/`} aria-selected={!sort} >○</Link>
      <Link to={`/?sort=◐`} aria-selected={sort === "◐"}>◐</Link>
      <Link to={`/?sort=⚡`} aria-selected={sort === "⚡"}>⚡</Link>
      {props.children}
    </nav>
  )
}
