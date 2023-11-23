import React, { useEffect, useRef, useState } from 'react'
import { useToast } from "./useToast";
import { ToastProps } from "./types";
import { animationVariables, closeButtonClasses, closeIcon, getIcon, iconClasses, wrapperClasses } from './utils';
import clsx from 'clsx';

type Props = ToastProps

const Toast = (props: Props) => {
    let {
        type = "info",
        icon = "",
        message = "---",
        id,
        duration = 3000,
      } = props;
      icon = icon === "" ? getIcon(type) : icon;
      duration = typeof duration === "string" ? +duration : duration;
      const wrapperRef = useRef<HTMLDivElement>(null);
      const { remove, position } = useToast();
      const dismissRef = useRef<ReturnType<typeof setTimeout>>();
      useEffect(() => {
        if (duration) {          
          dismissRef.current = setTimeout(() => {
            remove(id, wrapperRef);
          }, duration);
        }
        return () => {
          clearTimeout(dismissRef.current);
        };
      }, []);
      const progressBarRef = useRef<ReturnType<typeof setInterval>>();
      const [progress, setProgress] = useState(0);
      
      useEffect(() => {
        const complete = 100;
    
        if (duration) {
          progressBarRef.current = setInterval(() => {
            if (progress < complete) {
              setProgress((prev) => prev + 1);
            } else {
              clearInterval(progressBarRef.current);
            }
          }, duration / complete);
        }
    
        return () => {
          clearInterval(progressBarRef.current);
        };
      }, [progress]);
  return (
    <div
      style={{ ["--elm-translate" as any]: animationVariables[position] }}
      className={clsx(
        wrapperClasses[type],
        "animate-toastIn",
        "flex justify-start items-center overflow-x-hidden overflow-y-auto rounded-md shadow-lg my-3 relative p-2"
      )}
      ref={wrapperRef}
      role={"alert"}
    >
         {!!duration && (
        <div className={clsx(
          "absolute bottom-0 right-0 left-0 w-full h-[5px] rounded-md ",
          `bg-${type} dark:bg-${type}`
        )}>
          <span
            className="absolute bg-neutral-200 left-0 top-0 bottom-0 h-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
   {icon && (
        <div className={clsx(iconClasses[type], "flex p-2 rounded-full")}>
          <div className="inline-flex justify-center items-center w-4 h-4">
            <span className="sr-only">{type} Icon</span>
            {icon}
          </div>
        </div>
      )}
      <div className='flex justify-between items-start flex-1 '>

       <div className="text-sm font-semibold break-words w-[95%] max-w-[95%] p-3">{message}</div>
      <button
        aria-label="Close"
        onClick={() => {
          remove(id, wrapperRef);
        }}
        className={closeButtonClasses}
      >
        <span className="sr-only">Close</span>
        {closeIcon}
      </button>
      </div>
    </div>
  )
}

export default Toast