import React from 'react'
import defaultImg from "../assets/user-svgrepo-com.png"
import { space } from 'postcss/lib/list'
import { DropdownArrow } from '../icons'

function Avatar(props) {

    const { imgSrc, menu, ...restProps } = props

    return (
        <div className='avatar items-center cursor-pointer rounded-full '>


            <div {...restProps}>

                <img src={imgSrc ? imgSrc : defaultImg } alt="avatar" />

            </div>
{menu && <span><DropdownArrow className='w-5 absolute -bottom-2 -right-1 w-4'/></span>}

        </div>
    )
}

export default Avatar