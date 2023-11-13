import React from 'react'
import { useToast } from "./useToast";
import { ToastProps } from "./types";
import { getIcon } from './utils';

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
  return (
    <div>Toast</div>
  )
}

export default Toast