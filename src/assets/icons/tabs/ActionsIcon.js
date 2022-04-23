import React from "react"
import { SvgXml } from "react-native-svg"
export default function ActionsIcon({ color }) {
  const svgMarkup = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.8527 2.99999C0.382431 5.66665 0.382433 9.99016 2.85271 12.6568L12.4341 22.9999L12.5 22.9288L12.5659 23L22.1473 12.6569C24.6176 9.99024 24.6176 5.66673 22.1473 3.00008C19.677 0.333423 15.6719 0.333425 13.2016 3.00008L12.8668 3.3615C12.669 3.57512 12.3311 3.57512 12.1332 3.3615L11.7984 2.99999C9.32808 0.333335 5.32298 0.333336 2.8527 2.99999Z" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="25px" height="24px" />

  return <SvgImage />
}
