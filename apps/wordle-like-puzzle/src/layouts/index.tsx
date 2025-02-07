import { ToastProvider } from "@/components/custom-toastify/ToastProvider";
import React, { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  hasSidebar?: boolean;
  hideFooter?: boolean;
  hideHeader?: boolean;
  sidebarLayout?: 1 | 2;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout: React.FC<IProps> = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

Layout.defaultProps = {
  hideFooter: false,
  hideHeader: false,
};

export default Layout;
