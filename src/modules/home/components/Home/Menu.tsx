import React from "react";
import { NavLink } from "react-router-dom";


interface Props {
    title: string,
    onClick: (e:any) => void,
    icon:string,
    isActive:boolean,
    children?: any
}

const Menu = (props: Props) => {
    const { title, children,icon,isActive,onClick } = props
    
    return (
        <li className='item' onClick={onClick}>
            <a className={isActive ? 'active' : ''}>
                <i className={icon}></i>
                <span>{title}</span>
                <i className="fa-solid fa-angle-left icon-angle-left"></i>
                <i className="fa-solid fa-angle-down icon-angle-down"></i>
            </a>

            <ul className="sub_menu">
                {children}
            </ul>
        </li>
    )

}

const SMenu = ({ to,title,onClick }: any) => {
    return (
        <li onClick={onClick}>
            <NavLink to={to} exact activeClassName="active">{title}</NavLink>
        </li>
    )

}

export { Menu, SMenu };
