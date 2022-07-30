import React from "react";

export default function (props: { children?: React.ReactChild }) {
  return (<span className="bg-orange-400 text-black font-bold mx-1.5  px-1 h-fit">
    {props.children}
  </span>)
}
