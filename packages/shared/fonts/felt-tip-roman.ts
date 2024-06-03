import { css } from "styled-components";
import feltTipRomanEot from "./felt-tip-roman/FeltTipRoman.eot";
import feltTipRomanWoff2 from "./felt-tip-roman/FeltTipRoman.woff2";
import feltTipRomanWoff from "./felt-tip-roman/FeltTipRoman.woff";
import feltTipRomanTtf from "./felt-tip-roman/FeltTipRoman.ttf";
import feltTipRomanSvg from "./felt-tip-roman/FeltTipRoman.svg";

export const FeltTipRoman = css`
    /* Madre Script-regular*/
    @font-face {
        font-family: "Felt Tip Roman";
        font-display: swap;
        font-style: normal;
        font-weight: 400;
        src: url(${feltTipRomanEot}); /* IE9 Compat Modes */
        src: local(""), url(${feltTipRomanEot}) format("embedded-opentype"),
            /* IE6-IE8 */ url(${feltTipRomanWoff2}) format("woff2"),
            /* Super Modern Browsers */ url(${feltTipRomanWoff}) format("woff"),
            /* Modern Browsers */ url(${feltTipRomanTtf}) format("truetype"),
            /* Safari, Android, iOS */ url(${feltTipRomanSvg}) format("svg"); /* Legacy iOS */
    }
`;
