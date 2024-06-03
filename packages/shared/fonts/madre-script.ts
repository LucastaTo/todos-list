import { css } from "styled-components";
import madreScriptEot from "./madre-script/SVN-MadreScript.eot";
import madreScriptWoff2 from "./madre-script/SVN-MadreScript.woff2";
import madreScriptWoff from "./madre-script/SVN-MadreScript.woff";
import madreScriptTtf from "./madre-script/SVN-MadreScript.ttf";
import madreScriptSvg from "./madre-script/SVN-MadreScript.svg";

export const MadreScript = css`
    /* Madre Script-regular*/
    @font-face {
        font-family: "Madre Script";
        font-display: swap;
        font-style: normal;
        font-weight: 400;
        src: url(${madreScriptEot}); /* IE9 Compat Modes */
        src: local(""), url(${madreScriptEot}) format("embedded-opentype"),
            /* IE6-IE8 */ url(${madreScriptWoff2}) format("woff2"),
            /* Super Modern Browsers */ url(${madreScriptWoff}) format("woff"),
            /* Modern Browsers */ url(${madreScriptTtf}) format("truetype"),
            /* Safari, Android, iOS */ url(${madreScriptSvg}) format("svg"); /* Legacy iOS */
    }
`;
