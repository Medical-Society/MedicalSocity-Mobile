import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";
import { colors } from "../../AppStyles";

function HomeIcon(props) {
  const { focused } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27}
      height={26}
      viewBox="0 0 27 26"
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
        width={27}
        height={26}>
        <Path fill="#D9D9D9" d="M0.298828 0H26.195928V25.8971H0.298828z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M6.51 20.765h4.005v-5.7c0-.239.08-.44.242-.6a.817.817 0 01.602-.243h3.776c.24 0 .44.08.602.242a.817.817 0 01.242.601v5.7h4.005v-9.942a.312.312 0 00-.036-.15.404.404 0 00-.099-.12l-6.405-4.815a.308.308 0 00-.197-.066.308.308 0 00-.197.066l-6.405 4.815a.404.404 0 00-.099.12.312.312 0 00-.036.15v9.942zm-1.356 0v-9.94c0-.27.059-.524.176-.76.118-.237.285-.433.502-.588l6.405-4.829a1.594 1.594 0 011.006-.338c.379 0 .717.113 1.014.339l6.405 4.828c.217.155.385.35.502.588.117.236.176.49.176.76v9.94c0 .369-.134.687-.401.955a1.304 1.304 0 01-.955.4h-4.517c-.239 0-.439-.08-.6-.242a.817.817 0 01-.243-.601v-5.7H11.87v5.7c0 .239-.081.44-.243.601a.816.816 0 01-.601.243H6.51c-.369 0-.687-.134-.955-.401a1.304 1.304 0 01-.4-.955z"
          fill={focused ? colors.White : colors.LightBlue}
        />
      </G>
    </Svg>
  );
}

export default HomeIcon;
