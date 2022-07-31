import React, { FormEvent, useContext } from "react";
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
  const { state: games, update } = useContext(GlobalStateContext);

  const characterName: string = uniqueNamesGenerator(config);

  function submitGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = useId();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements &
      NewGameFormCollection;

    update({
      [id]: {
        id,
        label: formElements["game-name"].value,
        ships: [],
        type: "game",
      },
    });
  }

  return (
    <main className="h-full flex items-center p-4">
      <form
        className="h-full flex-1 justify-center text-start p-4"
        onSubmit={submitGame}
      >
        <label htmlFor="game-name">
          Would you prefer a banana or cherry?{" "}
          <input name="game-name" defaultValue={characterName} required />
        </label>
        <button type="submit">Okay</button>
      </form>
    </main>
  );
};
