import React from "react"
import { SvgXml } from "react-native-svg"
export default function MarkerIcon() {
  const svgMarkup = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 2.66669C4.87031 2.66669 2.33325 5.20374 2.33325 8.33335C2.33325 9.3083 3.01998 10.5968 4.14417 11.9723C5.22648 13.2966 6.55095 14.508 7.48553 15.3001C7.7889 15.5573 8.21094 15.5573 8.51431 15.3001C9.44888 14.508 10.7734 13.2966 11.8557 11.9723C12.9799 10.5968 13.6666 9.3083 13.6666 8.33335C13.6666 5.20374 11.1295 2.66669 7.99992 2.66669ZM0.333252 8.33335C0.333252 4.09917 3.76574 0.666687 7.99992 0.666687C12.2341 0.666687 15.6666 4.09917 15.6666 8.33335C15.6666 10.0624 14.5555 11.8294 13.4043 13.2379C12.2112 14.6977 10.7829 15.9991 9.80746 16.8258C8.75796 17.7154 7.24188 17.7154 6.19238 16.8258C5.21698 15.9991 3.7886 14.6977 2.59556 13.2379C1.44439 11.8294 0.333252 10.0624 0.333252 8.33335Z" fill="#56565F"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 7.33331C7.44772 7.33331 7 7.78103 7 8.33331C7 8.8856 7.44772 9.33331 8 9.33331C8.55228 9.33331 9 8.8856 9 8.33331C9 7.78103 8.55228 7.33331 8 7.33331ZM5 8.33331C5 6.67646 6.34315 5.33331 8 5.33331C9.65685 5.33331 11 6.67646 11 8.33331C11 9.99017 9.65685 11.3333 8 11.3333C6.34315 11.3333 5 9.99017 5 8.33331Z" fill="#56565F"/>
  </svg>
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="17px" />

  return <SvgImage />
}
