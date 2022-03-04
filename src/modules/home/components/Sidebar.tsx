import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router';


interface Props {
    checked: boolean
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar(props: Props) {
    const { checked, setChecked } = props
    const dispatch = useDispatch()

    const handleToggle = (e: any) => {

        if (e.target.closest('li') && !e.target.closest('.sub_menu')) {

            e.target.closest('li').classList.toggle('dropdown')

        }
        if (checked) {
            setChecked(!checked)
        }

    }

    return (

        <div className="sidebar">
            <ul className='sidebar_menu'>
                <li className={`item`} onClick={handleToggle}>
                    <a href="#">
                        <i className="fa-solid fa-inbox"></i>
                        <span>Orders</span>
                        <i className="fa-solid fa-angle-left"></i>
                        <i className="fa-solid fa-angle-down"></i>
                    </a>

                    <ul className="sub_menu">

                    </ul>
                </li>
                <li className={`item`} onClick={handleToggle}>
                    <a href="#" className='active'>
                        <i className="fa-solid fa-tag"></i>
                        <span>Catalog</span>
                        <i className="fa-solid fa-angle-left"></i>
                        <i className="fa-solid fa-angle-down"></i>
                    </a>

                    <ul className="sub_menu">
                        <li>
                            <a className='active' onClick={() => { dispatch(replace('/home/pages/products')) }}>Products</a>
                        </li>

                    </ul>
                </li>
                <li className={`item`} onClick={handleToggle}>
                    <a href="#" >
                        <i className="fa-solid fa-user-group"></i>
                        <span>User</span>
                        <i className="fa-solid fa-angle-left"></i>
                        <i className="fa-solid fa-angle-down"></i>
                    </a>

                    <ul className="sub_menu">
                        <li>
                            <a onClick={() => { dispatch(replace('/home/pages/userlist')) }}>User list</a>
                        </li>
                    </ul>
                </li>
                <li className={`item`} onClick={handleToggle}>
                    <a href="#" >
                        <i className="fa-solid fa-globe"></i>
                        <span>Sales channels</span>
                        <i className="fa-solid fa-angle-left"></i>
                        <i className="fa-solid fa-angle-down"></i>
                    </a>

                    <ul className="sub_menu">


                    </ul>
                </li>

            </ul>
        </div>

    )
}

export default Sidebar;