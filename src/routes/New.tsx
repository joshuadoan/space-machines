import React, { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as useId } from "uuid";

import {
  uniqueNamesGenerator,
  Config,
  colors,
  names,
} from "unique-names-generator";
import { GlobalStateContext } from "../Providers/GlobalState";

const config: Config = {
  dictionaries: [colors, names],
  separator: " ",
  style: "lowerCase",
};

type NewGameFormCollection = {
  "game-name": { value: string };
};
export let New = () => {
  let navigate = useNavigate();
  const { update } = useContext(GlobalStateContext);

  const characterName: string = uniqueNamesGenerator(config);

  function submitGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id = useId();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements &
      NewGameFormCollection;

    update?.({
      [id]: {
        id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        label: formElements["game-name"].value,
        ships: [],
        type: "game",
      },
    });

    navigate(`../${id}`, { replace: true });
  }

  return (
    <form className="py-4 flex gap-2" onSubmit={submitGame}>
      <label htmlFor="game-name" className="flex gap-2 items-center">
        Create a new game.
        <input
          className="bg-white text-black p-2"
          name="game-name"
          defaultValue={characterName}
          required
        />
      </label>
      <button type="submit" className="bg-orange-400 p-2 text-black">
        Okay
      </button>
    </form>
  );
};
