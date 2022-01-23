import { Color } from "excalibur";
import React from "react";
import Blockies from 'react-blockies';

export default function ({ size, color, seed, name }: {
  size?: number;
  seed?: string;
  color: Color;
  name: string
}) {
  return (
    <Blockies
      className="blockie"
      seed={seed || name}
      size={size || 8}
      color={color.toRGBA()} />
  )
}
