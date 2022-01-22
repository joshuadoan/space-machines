import { Color } from "excalibur";
import React from "react";
import Blockies from 'react-blockies';

export default function ({ size, color }: {
  size?: number;
  color: Color
}) {
  return (
    <Blockies
      className="blockie"
      seed={color.toString()}
      size={size || 8}
      color={color.toRGBA()} />
  )
}
