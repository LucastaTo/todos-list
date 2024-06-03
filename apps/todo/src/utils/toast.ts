import { toast, ToastOptions } from "react-toastify";

interface AlertProps extends ToastOptions {
  message: string;
}

export function alertSuccess({ message, ...props }: AlertProps) {
  return toast(message, {
    className: "alert-success",
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    type: "success",
    ...props,
  });
}

export function alertError({ message, ...props }: AlertProps) {
  return toast(message, {
    className: "alert-error",
    bodyClassName: "body-alert",
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    type: "error",
    icon: false,
    ...props,
  });
}
