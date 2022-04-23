import React from "react"
import { SvgXml } from "react-native-svg"
export default function ChatBigIcon({color}) {
  const svgMarkup = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="path-1-inside-1" fill="white">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 24C19.1274 24 24.5 18.6274 24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 14.4905 1.25871 16.8039 2.55761 18.7214L1.37868 23.1213L5.7785 21.9423C7.69611 23.2413 10.0094 24 12.5 24Z"/>
  </mask>
  <path d="M2.55761 18.7214L4.48946 19.2391L4.72598 18.3564L4.2135 17.5998L2.55761 18.7214ZM1.37868 23.1213L-0.553172 22.6036L-1.44975 25.9497L1.89632 25.0531L1.37868 23.1213ZM5.7785 21.9423L6.90014 20.2865L6.14355 19.774L5.26087 20.0105L5.7785 21.9423ZM22.5 12C22.5 17.5228 18.0228 22 12.5 22V26C20.232 26 26.5 19.732 26.5 12H22.5ZM12.5 2C18.0228 2 22.5 6.47715 22.5 12H26.5C26.5 4.26801 20.232 -2 12.5 -2V2ZM2.5 12C2.5 6.47715 6.97715 2 12.5 2V-2C4.76801 -2 -1.5 4.26801 -1.5 12H2.5ZM4.2135 17.5998C3.13177 16.0028 2.5 14.0782 2.5 12H-1.5C-1.5 14.9028 -0.614347 17.6049 0.901731 19.8431L4.2135 17.5998ZM3.31053 23.6389L4.48946 19.2391L0.625762 18.2038L-0.553172 22.6036L3.31053 23.6389ZM5.26087 20.0105L0.861042 21.1894L1.89632 25.0531L6.29614 23.8742L5.26087 20.0105ZM12.5 22C10.4218 22 8.49712 21.3682 6.90014 20.2865L4.65687 23.5982C6.89509 25.1143 9.59714 26 12.5 26V22Z" fill=${color} mask="url(#path-1-inside-1)"/>
  </svg>
  
  `
  const SvgImage = () => <SvgXml xml={svgMarkup} width="24px" />

  return <SvgImage />
}
