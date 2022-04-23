import React from "react"
import { SvgXml } from "react-native-svg"
export default function Burger() {
  const svgMarkup = `<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="3" y1="5" x2="21" y2="5" stroke="#56565F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="3" y1="12" x2="21" y2="12" stroke="#56565F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="3" y1="19" x2="21" y2="19" stroke="#56565F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="24px" height="21px"/>

  return <SvgImage />
}
