import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props:any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
  </Svg>
)

export default SvgComponent