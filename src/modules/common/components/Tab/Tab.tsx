import React, { useState } from "react";
import './Tab.css'


interface Item {
    title: string,
    isActive: boolean
    onItemClicked: () => void
}

interface Props{
    tabItems:{
        id:number,
        title:string,
        content:JSX.Element
    }[]

}

const TabItem = ({title,isActive,onItemClicked}: Item) => {
    return (
        <li className={isActive ? 'tabitem active' : 'tabitem'} onClick={onItemClicked}>
            <a className="tabitem__title">{title}</a>
        </li>
    )
};

const Tab = ({tabItems}:Props) => {
    const [active, setActive] = useState(1);

    return (
        <div className="tabs_wrapper">
            <ul className="tabs">
                {tabItems.map(({ id, title }) =>
                    <TabItem
                        key={title}
                        title={title}
                        isActive={active === id}
                        onItemClicked={() => setActive(id)}
                    />
                )}
            </ul>
            <div className="tabs_content">
                {tabItems.map(({ id, content }) => {
                    return active === id ? content : ''
                })}
            </div>
        </div>
    )
}

export default Tab
