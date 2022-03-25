import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storeSelector } from "../../../../redux/selector";
import Select from "../../../common/components/Select/Select";

interface Props {
    valueSearch: any
    setValueSearch: React.Dispatch<React.SetStateAction<any>>
}

const ProductFilter = ({ valueSearch, setValueSearch }: Props) => {
    const [extend, setExtend] = useState(false)
    const state = useSelector(storeSelector)
    const [valueFilter, setValueFilter] = useState(valueSearch)
    const [payloadSearchIn, setPayloadSearchIn] = useState<any>([])
    
    const handleSearch = (e: any) => {
        e.preventDefault()
        setValueSearch(valueFilter)
    }

    const handleCheckSearchIn = (search_in : string) =>{
        const selectedIndex = payloadSearchIn.indexOf(search_in);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(payloadSearchIn, search_in);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(payloadSearchIn.slice(1));
        } else if (selectedIndex === newSelected.length - 1) {
            newSelected = newSelected.concat(payloadSearchIn.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                payloadSearchIn.slice(0, selectedIndex),
                payloadSearchIn.slice(selectedIndex + 1),
            );
        }
        setPayloadSearchIn(newSelected)
        
    }

    useEffect(()=>{
        setValueFilter({...valueFilter,search_type:String(payloadSearchIn)})
    },[payloadSearchIn])


    useEffect(() => {
        setValueFilter(valueSearch)
    }, [valueSearch])

    const list_category = [{ title: 'Any category', value: '0' }].concat(state?.payload?.category?.map((data: any) => {
        return {
            title: data.name,
            value: data.id
        }
    }))
    const list_stock_status = [
        { title: 'Any category', value: 'all' },
        { title: 'In stock', value: 'in' },
        { title: 'Low stock', value: 'low' },
        { title: 'SOLD', value: 'out' },
    ]
    const list_availability = [
        { title: 'Any availability status ', value: 'all' },
        { title: 'Only Enabled ', value: '1' },
        { title: 'Only disabled ', value: '0' }
    ]

    return (
        <form >
            <div className='filter'>
                <ul>
                    <li style={{ width: '50%', marginRight: '20px' }}>
                        <input type='text'
                            placeholder="Search keywords"
                            onChange={(e) => {
                                setValueFilter((prev: any) => ({ ...prev, search: e.target.value }))
                            }}
                        />
                    </li>
                    <li style={{ width: '25%', marginRight: '20px' }}>
                        <Select
                            data={list_category}
                            placeholder={"Any Category"}
                            defaultSelect={0}
                            onChange={(value) => { setValueFilter((prev: any) => ({ ...prev, category: value })) }}
                        />
                    </li>
                    <li style={{ width: '20%', marginRight: '20px' }}>
                        <Select
                            data={list_stock_status}
                            placeholder={"Any stock status"}
                            defaultSelect={0}
                            onChange={(value) => { setValueFilter((prev: any) => ({ ...prev, stock_status: value })) }}
                        />
                    </li>
                    <li>
                        <button onClick={handleSearch} type="button" className='btn btn-default btn-search'>Search</button>
                    </li>
                </ul>
                <a className='arrow' aria-expanded={extend} onClick={() => setExtend(!extend)} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-controls="collapseExample"></a>
                <div className="collapse" id="collapseExample">
                    <div className='hidden filter_product'>
                        <ul className="filter_conditions">
                            <li className="search_in">
                                <label>Search in</label>
                                <ul>
                                    <li>
                                        <input
                                            type='checkbox'
                                            onClick={(e)=>handleCheckSearchIn('name')}
                                        />
                                        <label>Name</label>
                                    </li>
                                    <li>
                                        <input
                                            type='checkbox'
                                            onClick={(e)=>handleCheckSearchIn('sku')}
                                    
                                        />
                                        <label >SKU</label>
                                    </li>
                                    <li>
                                        <input
                                            type='checkbox'
                                            onClick={(e)=>handleCheckSearchIn('description')}
                                        />
                                        <label >Full Description</label>
                                    </li>
                                </ul>
                            </li>
                            <li className="d-flex align-items-center availability col-4">
                                <label>Availability</label>
                                <Select
                                    data={list_availability}
                                    placeholder={"Any availability status"}
                                    defaultSelect={0}
                                    onChange={(value) => { setValueFilter((prev: any) => ({ ...prev, availability: value })) }}
                                />
                            </li>
                            <li className="d-flex  align-items-center vendor">
                                <label>Vendor</label>
                                <input type="text"
                                    onChange={(e) => {
                                        setValueFilter((prev: any) => ({ ...prev, vendor: e.target.value }))
                                    }}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </form >
    )
}

export default ProductFilter