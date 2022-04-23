import React from "react"
import { SvgXml } from "react-native-svg"
export default function Delivery() {
  const svgMarkup = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.56005 8.9577C1.73231 8.63934 1.69786 7.48097 2.50523 7.11399L13.462 2.13365C14.3031 1.7513 15.1685 2.61664 14.7861 3.45782L9.8058 14.4146C9.43882 15.2219 8.28045 15.1875 7.96209 14.3597L6.62107 10.8731C6.5195 10.609 6.3108 10.4003 6.0467 10.2987L2.56005 8.9577Z" stroke="#2AA6FF" stroke-width="2"/>
  </svg>
  
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="17px" />

  return <SvgImage />
}
