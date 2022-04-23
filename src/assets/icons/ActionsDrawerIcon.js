
import React from "react"
import { SvgXml } from "react-native-svg"
export default function ActionsDrawerIcon() {
  const svgMarkup = `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.84819 2.51475C1.27293 4.09 1.27294 6.64399 2.84819 8.21924L8.95808 14.3291L9.00008 14.2871L9.04213 14.3292L15.152 8.21929C16.7273 6.64404 16.7273 4.09005 15.152 2.5148C13.5768 0.939552 11.0228 0.939553 9.44753 2.5148L9.35368 2.60865C9.15842 2.80391 8.84184 2.80391 8.64657 2.60865L8.55267 2.51475C6.97742 0.9395 4.42344 0.939501 2.84819 2.51475Z" stroke="#2AA6FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="18px" height="16"/>

  return <SvgImage />
}
