import React, { useRef, useState } from "react";
import './Select.css'

interface Props {
    data: any,
    placeholder?: string
    checkbox?:boolean
    defaultSelect?:any[]
}

const MultipleSelect = ({ data, placeholder,checkbox,defaultSelect }: Props) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(defaultSelect || [])
    const [title, setTitle] = useState<Array<any>>([])

    const handleOpen = (e: any) => {
        e.preventDefault();
        if(!e.target.closest(".icon-xmark")){
            setOpen(!open)  
        }
    }


    const handleSelect = (e: React.MouseEvent<unknown>, value: string) => {
        e.preventDefault();
        const selectedIndex = selected.indexOf(value);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, value);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    const isSelected = (value: any) => {
        if (selected.indexOf(value) !== -1) {
            return 'selected'
        }
        return ''
    }

    return (
        <>
            <button className='multiple-select-custom' value={selected}>
                <div className='select-input' onClick={handleOpen}>
                    {selected.length > 0 ?
                        selected.map((selected,index) => {
                            return (
                                <div className="option-view" key={index}>
                                    <span>{selected}</span>
                                    <span className="icon-xmark" onClick={(e)=>handleSelect(e,selected)}><i className="fa-solid fa-xmark"></i></span>
                                </div>
                            )
                        })
                        : <input type='text' placeholder={placeholder}></input>}
                    
                    {open ? <i className="fa-solid fa-angle-up ms-auto"></i> : <i className="fa-solid fa-angle-down ms-auto"></i>}
                </div>

                {open ?
                    <div className='option-list'>
                        {data.map((data: any, index: any) => {
                            const isItemSelected = isSelected(data.value);
                            return (
                                <div
                                    key={index}
                                    onClick={(e) => {
                                        handleSelect(e, index)
                                        handleOpen(e)
                                    }}
                                    className={`option-item ${isItemSelected}`}
                                >
                                    {checkbox && <input className="me-2" type='checkbox' checked={!!isItemSelected}></input>}
                                    <option className='option-title' value={data.value}>{data.title}</option>
                                </div>
                            )

                        })}
                    </div>
                    : ''
                }
            </button>
        </>
    )
}

export default MultipleSelect