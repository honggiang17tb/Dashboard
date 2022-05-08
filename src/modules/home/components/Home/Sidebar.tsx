import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import MENU from '../../../../configs/menu';
import { Menu, SMenu } from './Menu';

interface Props {
    checked: boolean
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar(props: Props) {
    const { checked, setChecked } = props
    const location = useLocation()
    const [active, setActive] = useState<number>()

    
    useEffect(() => {
        for (let i = 0; i <= MENU.length; i++) {
            for (let j = 0; j <= MENU[i]?.submenus?.length; j++) {
                if(MENU[i].submenus[j]?.path === location.pathname){
                    setActive(MENU[i].submenus[j].parent_id)
                }
            }
        }

    }, [])


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
                {MENU.map((menu) => {
                    const { id, key, title, icon } = menu
                    return (
                        <Menu key={key} title={title} icon={icon} onClick={handleToggle} isActive={active === id}>
                            {menu.submenus.map((x) => {
                                return <SMenu key={x.key} to={x.path} title={x.title} onClick={() => setActive(x.parent_id)} />
                            })}
                        </Menu>
                    )
                })}

            </ul>
        </div>

    )
}

export default Sidebar;