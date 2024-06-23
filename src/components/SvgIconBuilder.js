import React from "react";
import { Svg, Mask, Path, G } from "react-native-svg";
import { colors } from "../../AppStyles";

const SvgIconBuilder = ({ children, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <Mask
      id="a"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}>
      <Path fill={colors.SolidGrey} d="M0 0H24V24H0z" />
    </Mask>
    <G mask="url(#a)">{children}</G>
  </Svg>
);

export default SvgIconBuilder;
