import React, { useEffect, useRef, useState } from "react";
import './Select.css'

interface Props {
    data: {title:string,value:string}[],
    placeholder?: string
    defaultSelect?: number
    onChange? : (e:any)=>void
}

const Select = ({ data, placeholder, defaultSelect,onChange }: Props) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const [title, setTitle] = useState(placeholder)
    const [selected, setSelected] = useState(defaultSelect)


    const handleOpen = (e: any) => {
        e.preventDefault();
        setOpen(!open)

    }
    const isSelected = (id: number) => selected === id ? 'selected' : '';

    const handleChange = (e:any) =>{
        
        console.log(e);
    }


    return (
        <>
            <button onClick={handleOpen} className='select-custom'>
                <div className='select-input'>
                    <span className='select-title'>{title}</span>
                    <input onChange={handleChange} className='input-value opacity-0' value={value}></input>
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
                                        setValue(data.value)
                                        setTitle(data.title)
                                        setSelected(index)
                                        handleOpen(e)
                                    }}
                                    className={`option-item ${isItemSelected}`}
                                >
                                    <option className="option-title" value={data.value}>{data.title}</option>
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