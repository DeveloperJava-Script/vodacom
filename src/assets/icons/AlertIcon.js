import React from "react"
import { SvgXml } from "react-native-svg"
export default function AlertIcon({color}) {
  const svgMarkup = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00008 2.66669C5.50228 2.66669 2.66675 5.50222 2.66675 9.00002C2.66675 12.4978 5.50228 15.3334 9.00008 15.3334C12.4979 15.3334 15.3334 12.4978 15.3334 9.00002C15.3334 5.50222 12.4979 2.66669 9.00008 2.66669ZM0.666748 9.00002C0.666748 4.39765 4.39771 0.666687 9.00008 0.666687C13.6025 0.666687 17.3334 4.39765 17.3334 9.00002C17.3334 13.6024 13.6025 17.3334 9.00008 17.3334C4.39771 17.3334 0.666748 13.6024 0.666748 9.00002Z" fill=${color}/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 4.66669C9.55228 4.66669 10 5.1144 10 5.66669V9.00002C10 9.55231 9.55228 10 9 10C8.44772 10 8 9.55231 8 9.00002V5.66669C8 5.1144 8.44772 4.66669 9 4.66669Z" fill=${color}/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 10.6667C9.55228 10.6667 10 11.1144 10 11.6667V12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12V11.6667C8 11.1144 8.44772 10.6667 9 10.6667Z" fill=${color}/>
  </svg>
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="17px" />

  return <SvgImage />
}
