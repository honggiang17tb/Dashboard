import React, { useEffect, useRef, useState } from "react";
import './Select.css'

interface Props {
    data: any,
    placeholder?: string
    checkbox?: boolean
    defaultSelect?: any[]
    onChange?: (value: any) => void

}

const MultipleSelect = ({ data, placeholder, checkbox, defaultSelect, onChange }: Props) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(defaultSelect || [])
    const [selectTitle, setSelectTitle] = useState<Array<any>>([])
    const [selectValue, setSelectValue] = useState<Array<any>>([])

    const handleOpen = (e: any) => {
        e.preventDefault();
        if (!e.target.closest(".icon-xmark")) {
            setOpen(!open)
        }
    }

    const handleSelect = (e: React.MouseEvent<unknown>, index: any) => {
        e.preventDefault();
        const selectedIndex = selected.indexOf(index);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
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


    const isSelected = (index: any) => {
        return selected.indexOf(index) !== -1 ? 'selected' : ''
    }

    useEffect(() => {
        const title = selected.map((select) => {
            return {
                index: select,
                title: data[select].title
            }
        })
        const value = selected.map((select) => {
            return data[select].value
        })
        setSelectTitle(title);
        setSelectValue(value);

    }, [selected])    

    const handleChange = () => {
        onChange ? onChange(selectValue) : null
    }

    useEffect(() => {
        handleChange()
    }, [selectValue])
    return (
        <>
            <button className='multiple-select-custom'>
                <div className='select-input' onClick={handleOpen}>
                    {selectTitle.length > 0 ?
                        selectTitle.map((x, index) => {
                            return (
                                <div className="option-view" key={index}>
                                    <span>{x.title}</span>
                                    <span className="icon-xmark" onClick={(e) => handleSelect(e, x.index)}><i className="fa-solid fa-xmark"></i></span>
                                </div>
                            )
                        })
                        : <input type='text' placeholder={placeholder}></input>}

                    {open ? <i className="fa-solid fa-angle-up ms-auto"></i> : <i className="fa-solid fa-angle-down ms-auto"></i>}
                </div>

                {open ?
                    <div className='option-list'>
                        {data.map((data: any, index: any) => {
                            const isItemSelected = isSelected(index);
                            return (
                                <div
                                    key={index}
                                    onClick={(e) => {
                                        handleSelect(e, index)
                                        handleOpen(e)
                                    }}
                                    className={`option-item ${isItemSelected}`}
                                >
                                    {checkbox && <input className="me-2" type='checkbox' readOnly checked={!!isItemSelected}></input>}
                                    <option className='option-title'>{data.title}</option>
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