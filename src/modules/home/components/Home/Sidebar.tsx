import { replace } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../../../configs/routes';


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
                    <a>
                        <i className="fa-solid fa-inbox"></i>
                        <span>Orders</span>
                        <i className="fa-solid fa-angle-left icon-angle-left"></i>
                        <i className="fa-solid fa-angle-down icon-angle-down"></i>
                    </a>

                    <ul className="sub_menu">
                        
                    </ul>
                </li>
                <li className={`item`} onClick={handleToggle}>
                    <a className='active'>
                        <i className="fa-solid fa-tag"></i>
                        <span>Catalog</span>
                        <i className="fa-solid fa-angle-left icon-angle-left"></i>
                        <i className="fa-solid fa-angle-down icon-angle-down"></i>
                    </a>

                    <ul className="sub_menu">
                        <li>
                            <a className='active' onClick={() => { dispatch(replace(ROUTES.product)) }}>Products</a>
                        </li>
                        

                    </ul>
                </li>
                <li className={`item`} onClick={handleToggle}>
                    <a >
                        <i className="fa-solid fa-user-group"></i>
                        <span>User</span>
                        <i className="fa-solid fa-angle-left icon-angle-left"></i>
                        <i className="fa-solid fa-angle-down icon-angle-down"></i>
                    </a>

                    <ul className="sub_menu">
                        <li>
                            <a onClick={() => { dispatch(replace(ROUTES.user)) }}>User list</a>
                        </li>
                    </ul>
                </li>
                <li className={`item`} onClick={handleToggle}>
                    <a >
                        <i className="fa-solid fa-globe"></i>
                        <span>Sales channels</span>
                        <i className="fa-solid fa-angle-left icon-angle-left"></i>
                        <i className="fa-solid fa-angle-down icon-angle-down"></i>
                    </a>

                    <ul className="sub_menu">


                    </ul>
                </li>

            </ul>
        </div>

    )
}

export default Sidebar;