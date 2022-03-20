import React, { useState } from "react";
import Select from "../../../common/components/Select/Select";

const ProductFilter = () => {
    const [extend, setExtend] = useState(false)

    const list_category =  [{title:'Any category',value:''}]
    const list_stock_status = [{title:'Any stock status',value:''}]
    const list_availability = [{title:'Any availability status ',value:''}]

    return (
        <form >
            <div className='filter'>
                <ul>
                    <li style={{ width: '50%', marginRight: '20px' }}>
                        <input type='text' placeholder="Search keywords"></input>
                    </li>
                    <li style={{ width: '25%', marginRight: '20px' }}>
                        <Select data={list_category} placeholder={"Any Category"} defaultSelect={0} />
                    </li>
                    <li style={{ width: '20%', marginRight: '20px' }}>
                        <Select data={list_stock_status} placeholder={"Any stock status"} defaultSelect={0} />
                    </li>
                    <li>
                        <button type="submit" className='btn btn-default btn-search'>Search</button>
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
                                        <input type='checkbox'></input>
                                        <label>Name</label>
                                    </li>
                                    <li>
                                        <input type='checkbox'></input>
                                        <label >SKU</label>
                                    </li>
                                    <li>
                                        <input type='checkbox'></input>
                                        <label >Full Description</label>
                                    </li>
                                </ul>
                            </li>
                            <li className="d-flex align-items-center availability col-4">
                                <label>Availability</label>
                                <Select data={list_availability} placeholder={"Any availability status"} defaultSelect={0} />
                            </li>
                            <li className="d-flex  align-items-center vendor">
                                <label>Vendor</label>
                                <input type="text" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </form >
    )
}

export default ProductFilter