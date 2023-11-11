import { ToastPositionType } from "./types";

export const positionClasses:Record<ToastPositionType,string>={
 topRight: "top-0 right-1",
  topCenter: "top-0 right-1/2 translate-x-1/2",
  topLeft: "top-0 left-1",
  bottomLeft: "bottom-0 left-1",
  bottomCenter: "bottom-0 right-1/2 translate-x-1/2",
  bottomRight: "bottom-0 right-1",
}