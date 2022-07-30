import React from "react";
import { WindupChildren } from "windups";
import TimeAgo from "javascript-time-ago";
import { Ship } from "../game/actors/ship/ship";
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
let timeAgo = new TimeAgo('en-US')

export default function ({ selected }: {
  selected: Ship,
}) {
  let journal = selected?.journal || [];
  let [first, ...rest] = journal;
  return (
    <ul className="py-2">
      <li><WindupChildren>{first.message}.</WindupChildren></li>
      {
        rest.map(({ at, message }, i) => (
          <li key={`${i}-${at}`}>
            <p>
              {message}
              (<span className="text-slate-50">
                {timeAgo.format(at)}
              </span>).
            </p>
          </li>
        ))
      }
    </ul>
  )
}
