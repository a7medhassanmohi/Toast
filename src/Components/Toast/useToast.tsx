import { FC, ReactNode, RefObject, createContext, useContext, useState } from "react";
import { ToastContextType, ToastPositionType, ToastProps } from "./types";
import clsx from "clsx";
import { positionClasses } from "./utils";
import Toast from "./Toast";

const ToastContext=createContext<ToastContextType>({
    add: () => {},
    remove: () => {},
    position: "topRight",
})
export const useToast = () => useContext(ToastContext);
export const ToastProvider:FC<{children:ReactNode}>=({children})=>{
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const [position, setPosition] = useState<ToastPositionType>("topRight");
    const add = (toast: Omit<ToastProps, "id">) => {
        //first check for position
        if (toast.position && toast.position !== position) {
          setPosition(toast.position);
        }
    
        // add it to the list
        setToasts((toasts) => [...toasts, { ...toast, id: (Math.random() * 10000* Date.now()).toString() }]);
      };
      const remove = (toastId: string, ref: RefObject<HTMLDivElement>) => {
        ref?.current?.classList.add("animate-toastOut");
        //remove element after animation is done
        ref?.current?.addEventListener("animationend", () => {
          // lets remove it
          setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
        });
      };
return(
   <ToastContext.Provider value={{add,remove,position}}>
      {children}
      <div className={clsx(
        positionClasses[position],
        "fixed w-screen max-w-xs z-100"
      )}>
          {toasts.map((toast) => (
            <Toast key={toast.id}/>
          ))}
      </div>
   </ToastContext.Provider>
)
}