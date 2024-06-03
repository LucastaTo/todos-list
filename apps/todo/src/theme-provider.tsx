import { GlobalStyle } from "@todo/shared/css";
import { ThemeProvider, themes } from "@todo/shared/styled";
import { FC } from "react";

const Theme: FC<{children : React.ReactNode}> = ({ children }) => {
    return (
        <ThemeProvider theme={themes.light}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export default Theme;
