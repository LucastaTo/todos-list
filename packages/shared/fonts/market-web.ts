import { css } from "styled-components";
import marketWebEot from "./market-web/MarketWeb.eot";
import marketWebWoff2 from "./market-web/MarketWeb.woff2";
import marketWebWoff from "./market-web/MarketWeb.woff";
import marketWebTtf from "./market-web/MarketWeb.ttf";
import marketWebSvg from "./market-web/MarketWeb.svg";

export const MarketWeb = css`
    /* Madre Script-regular*/
    @font-face {
        font-family: "Market Web";
        font-display: swap;
        font-style: normal;
        font-weight: 400;
        src: url(${marketWebEot}); /* IE9 Compat Modes */
        src: local(""), url(${marketWebEot}) format("embedded-opentype"),
            /* IE6-IE8 */ url(${marketWebWoff2}) format("woff2"),
            /* Super Modern Browsers */ url(${marketWebWoff}) format("woff"),
            /* Modern Browsers */ url(${marketWebTtf}) format("truetype"),
            /* Safari, Android, iOS */ url(${marketWebSvg}) format("svg"); /* Legacy iOS */
    }
`;
