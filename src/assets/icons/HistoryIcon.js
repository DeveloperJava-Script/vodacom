import React from "react"
import { SvgXml } from "react-native-svg"
export default function Historycon({color}) {
  const svgMarkup = `<svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.988 0C5.364 0 0 5.376 0 12C0 18.624 5.364 24 11.988 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 11.988 0ZM12 21.6C6.696 21.6 2.4 17.304 2.4 12C2.4 6.696 6.696 2.4 12 2.4C17.304 2.4 21.6 6.696 21.6 12C21.6 17.304 17.304 21.6 12 21.6Z" fill=${color}/>
  <path d="M11.5625 7H10V13L15.4688 16.15L16.25 14.92L11.5625 12.25V7Z" fill=${color}/>
  </svg>
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="24px" />

  return <SvgImage />
}
