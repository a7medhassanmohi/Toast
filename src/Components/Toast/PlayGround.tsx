import React from 'react'
import { useToast } from '.'

type Props = {}

export const PlayGround = (props: Props) => {
    const {add}=useToast()
  return (
    <div className='flex justify-center items-center p-6 min-h-screen min-w-screen dark:bg-gradient-to-br from-[#333867] to-[#17193b]'>
        
        <div className="bg-neutral-100 dark:bg-black/30 max-w-md rounded-2xl p-6 shadow-md">
        PlayGround
        </div>
        </div>
  )
}

