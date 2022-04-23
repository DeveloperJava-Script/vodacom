import React from "react"
import { SvgXml } from "react-native-svg"
export default function ProfileIcon({ color, big }) {
  const svgMarkup = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.08643 14.3333V14.3333C2.29523 12.9974 3.16776 11.8462 4.47556 11.5029C5.48089 11.2391 6.76445 11 8.11527 11C9.46609 11 10.7497 11.2391 11.755 11.5029C13.0628 11.8462 13.9353 12.9974 14.1441 14.3333V14.3333" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.11523 7.99998C9.96503 7.99998 11.4646 6.5076 11.4646 4.66665C11.4646 2.8257 9.96503 1.33331 8.11523 1.33331C6.26543 1.33331 4.76587 2.8257 4.76587 4.66665C4.76587 6.5076 6.26543 7.99998 8.11523 7.99998Z" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg> 
  `
  const SvgImage = () => (
    <SvgXml
      xml={svgMarkup}
      width={big ? "21px" : "17px"}
      height={big ? "20px" : "16px"}
    />
  )

  return <SvgImage />
}
