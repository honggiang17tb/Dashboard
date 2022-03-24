import React, { useEffect, useRef, useState } from "react";
import './Select.css'

interface Props {
    data: {title:string,value:any}[],
    placeholder?: string
    defaultSelect?: number
    checkbox ?:boolean
    onChange? : (value:any)=>void
}

const Select = ({ data, placeholder, defaultSelect,checkbox,onChange }: Props) => {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(placeholder)
    const [selected, setSelected] = useState(defaultSelect)
    const [value,setValue] = useState<any>()

    const handleOpen = (e: any) => {
        e.preventDefault();
        setOpen(!open)
    }
    const isSelected = (id: number) => selected === id ? 'selected' : '';

    const handleChange = () =>{
        onChange ? onChange(value) : null
    }

    useEffect(()=>{
        handleChange()
    },[value])

    return (
        <>
            <button onClick={handleOpen} className='select-custom'>
                <div className='select-input'>
                    <span className='select-title'>{title}</span>
                    {open ? <i className="fa-solid fa-angle-up ms-auto"></i> : <i className="fa-solid fa-angle-down ms-auto"></i>}
                </div>

                {open ?
                    <div className='option-list'>
                        {data.map((data, index) => {
                            const isItemSelected = isSelected(index);
                            return (
                                <div
                                    key={index}
                                    onClick={(e) => {
                                        setTitle(data.title)
                                        setValue(data.value);
                                        setSelected(index)
                                        handleOpen(e)
                                    }}
                                    className={`option-item ${isItemSelected}`}
                                >
                                    {checkbox && <input className="me-2" type='checkbox' readOnly checked={!!isItemSelected}></input>}
                                    <option className="option-title" >{data.title}</option>
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

export default Select