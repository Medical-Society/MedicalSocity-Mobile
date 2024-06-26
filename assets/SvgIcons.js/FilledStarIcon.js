import * as React from "react";
import Svg, {
  Mask,
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

function FilledStarIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
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
        width={20}
        height={20}>
        <Path fill="#D9D9D9" d="M0 0H20V20H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M10 13.903l-3.053 2.333a.468.468 0 01-.325.102.66.66 0 01-.304-.103.485.485 0 01-.214-.581l1.169-3.815-2.96-2.132a.464.464 0 01-.209-.271.517.517 0 01.008-.318c.039-.1.1-.186.184-.26a.46.46 0 01.313-.108h3.696l1.19-3.943A.529.529 0 0110 4.418a.529.529 0 01.506.39l1.189 3.942h3.696a.46.46 0 01.313.109.66.66 0 01.184.26c.036.1.038.205.008.317a.47.47 0 01-.204.271l-2.965 2.132 1.168 3.814a.486.486 0 01-.213.582.66.66 0 01-.304.103.45.45 0 01-.32-.102l-3.058-2.333z"
          fill="url(#paint0_linear_1413_8526)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1413_8526"
          x1={4.05772}
          y1={4.41797}
          x2={17.254}
          y2={6.18745}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#6800F0" />
          <Stop offset={1} stopColor="#0068EE" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default FilledStarIcon;
