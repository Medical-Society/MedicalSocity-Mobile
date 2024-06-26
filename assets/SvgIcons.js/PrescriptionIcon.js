import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

function PrescriptionIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Mask
        id="a"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M8.625 20.5c-1.426 0-2.636-.498-3.632-1.493C3.998 18.01 3.5 16.8 3.5 15.375a5.109 5.109 0 011.506-3.629l6.74-6.74A5.109 5.109 0 0115.375 3.5c1.426 0 2.636.498 3.632 1.493.995.996 1.493 2.206 1.493 3.632a5.11 5.11 0 01-1.506 3.629l-6.74 6.74A5.11 5.11 0 018.625 20.5zm6.477-6.477L17.95 11.2A3.678 3.678 0 0019 8.625c0-1-.354-1.854-1.063-2.563A3.492 3.492 0 0015.376 5 3.676 3.676 0 0012.8 6.05L9.977 8.898l5.125 5.125zM8.625 19a3.678 3.678 0 002.575-1.05l2.823-2.848-5.125-5.125L6.05 12.8A3.677 3.677 0 005 15.375c0 1 .354 1.854 1.062 2.563A3.492 3.492 0 008.625 19z"
          fill="#1E1E1E"
        />
      </G>
    </Svg>
  );
}

export default PrescriptionIcon;
