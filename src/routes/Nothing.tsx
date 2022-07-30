import React, { FC, ReactChild } from "react";

export let Nothing: FC<{
  children: ReactChild;
}> = (props) => {
  return (
    <main className="h-screen flex items-center justify-center bg-blue-500">
      {props.children}
    </main>
  );
};
