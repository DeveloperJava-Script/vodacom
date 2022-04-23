import React from "react"
import { SvgXml } from "react-native-svg"
export default function PassIcon({color}) {
  const svgMarkup = `<svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.35 3.35007C5.78759 2.91249 6.38108 2.66666 6.99992 2.66666C7.61876 2.66666 8.21225 2.91249 8.64983 3.35007C9.08742 3.78766 9.33325 4.38115 9.33325 4.99999V6.99999H4.66658V4.99999C4.66658 4.38115 4.91242 3.78766 5.35 3.35007ZM2.66658 7.07433V4.99999C2.66658 3.85072 3.12313 2.74852 3.93579 1.93586C4.74845 1.1232 5.85065 0.666656 6.99992 0.666656C8.14919 0.666656 9.25139 1.1232 10.064 1.93586C10.8767 2.74852 11.3333 3.85072 11.3333 4.99999V7.07433C12.6692 7.37748 13.6666 8.57226 13.6666 9.99999V13.3333C13.6666 14.9902 12.3234 16.3333 10.6666 16.3333H3.33325C1.6764 16.3333 0.333252 14.9902 0.333252 13.3333V9.99999C0.333252 8.57226 1.33059 7.37748 2.66658 7.07433ZM3.33325 8.99999H10.6666C11.2189 8.99999 11.6666 9.4477 11.6666 9.99999V13.3333C11.6666 13.8856 11.2189 14.3333 10.6666 14.3333H3.33325C2.78097 14.3333 2.33325 13.8856 2.33325 13.3333V9.99999C2.33325 9.4477 2.78097 8.99999 3.33325 8.99999Z" fill=${color}/>
  </svg>
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="17px" />

  return <SvgImage />
}
