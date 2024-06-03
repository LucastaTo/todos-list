import { css } from "styled-components";
import lakesideEot from "./lakeside/Lakeside.eot";
import lakesideWoff2 from "./lakeside/Lakeside.woff2";
import lakesideWoff from "./lakeside/Lakeside.woff";
import lakesideTtf from "./lakeside/Lakeside.ttf";
import lakesideSvg from "./lakeside/Lakeside.svg";

export const Lakeside = css`
    /* Madre Script-regular*/
    @font-face {
        font-family: "lakeside";
        font-display: swap;
        font-style: normal;
        font-weight: 400;
        src: url(${lakesideEot}); /* IE9 Compat Modes */
        src: local(""), url(${lakesideEot}) format("embedded-opentype"),
            /* IE6-IE8 */ url(${lakesideWoff2}) format("woff2"),
            /* Super Modern Browsers */ url(${lakesideWoff}) format("woff"),
            /* Modern Browsers */ url(${lakesideTtf}) format("truetype"),
            /* Safari, Android, iOS */ url(${lakesideSvg}) format("svg"); /* Legacy iOS */
    }
`;
