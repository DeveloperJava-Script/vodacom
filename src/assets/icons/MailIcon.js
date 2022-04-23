import React from "react"
import { SvgXml } from "react-native-svg"
export default function MailIcon() {
  const svgMarkup = `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 4.66669C0 3.00983 1.34315 1.66669 3 1.66669H15C16.6569 1.66669 18 3.00983 18 4.66669V12C18 13.6569 16.6569 15 15 15H3C1.34315 15 0 13.6569 0 12V4.66669ZM3 3.66669C2.44771 3.66669 2 4.1144 2 4.66669V12C2 12.5523 2.44772 13 3 13H15C15.5523 13 16 12.5523 16 12V4.66669C16 4.1144 15.5523 3.66669 15 3.66669H3Z" fill="#56565F"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.74556 4.70671C0.569058 3.62824 1.33206 1.66669 2.92808 1.66669H15.0719C16.6679 1.66669 17.4309 3.62824 16.2544 4.70671L11.7029 8.87893C10.1736 10.2808 7.82637 10.2808 6.29708 8.87893L1.74556 4.70671ZM3.57078 3.66669L7.64853 7.40462C8.41317 8.10555 9.58679 8.10554 10.3514 7.40462L14.4292 3.66669H3.57078Z" fill="#56565F"/>
  </svg>
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="18px" />

  return <SvgImage />
}
