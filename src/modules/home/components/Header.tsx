import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { logOut } from '../../auth/redux/authReducer'
import { storeSelector } from '../../../redux/selector';

interface Props {
    checked: boolean,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = (props: Props) => {
    const { checked, setChecked } = props
    const dispatch = useDispatch()
    const state = useSelector(storeSelector)

    const handleLogout = () => {
        Cookies.remove(ACCESS_TOKEN_KEY)
        dispatch(logOut(state.profile));
        dispatch(replace(ROUTES.login));
    }

    return (
        <header>

            <div className="left_area">
                <label htmlFor="check" onClick={() => setChecked(!checked)}>
                    <i className="fas fa-bars" id="sidebar_btn"></i>
                </label>
                <a href="#" className='logo'><h3>Gear Focus Admin</h3></a>
                <div className="notify">
                    <i className="fa-solid fa-bell"></i>
                    <ul className="notify_list">
                        <li className="notify_item">
                            <a href="#">
                                <div className="notify_header">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM382.6 302.6l-103.1 103.1C270.7 414.6 260.9 416 256 416c-4.881 0-14.65-1.391-22.65-9.398L129.4 302.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 306.8V128c0-17.69 14.33-32 32-32s32 14.31 32 32v178.8l49.38-49.38c12.5-12.5 32.75-12.5 45.25 0S395.1 290.1 382.6 302.6z"/></svg>
                                    <span>Unapproved vendors</span>
                                    <div className="counter">2</div>
                                </div>
                            </a>
                        </li>
                        <li className="notify_item">
                            <a href="#">
                                <div className="notify_header">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" /></svg>
                                    <span>Requests for payment</span>
                                    <div className="counter">4</div>
                                </div>
                            </a>
                        </li>
                        <li className="notify_item">
                            <a href="#">
                                <div className="notify_header">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V128C512 92.65 483.3 64 448 64zM64 112h384c8.822 0 16 7.178 16 16v22.16l-166.8 138.1c-23.19 19.28-59.34 19.27-82.47 .0156L48 150.2V128C48 119.2 55.18 112 64 112zM448 400H64c-8.822 0-16-7.178-16-16V212.7l136.1 113.4C204.3 342.8 229.8 352 256 352s51.75-9.188 71.97-25.98L464 212.7V384C464 392.8 456.8 400 448 400z"/></svg>
                                    <span>Messages</span>
                                    <div className="counter">11</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="right_area">
                <i className="fa-solid fa-user"></i>
                <div className="account_menu">
                    <ul className="info_account">
                        <li className="account_profile">
                            <a href="">My profile</a>
                            <p>{state?.profile?.user?.login}</p>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header