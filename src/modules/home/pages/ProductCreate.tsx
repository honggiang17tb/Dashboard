import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { replace } from "connected-react-router";
import { ROUTES } from '../../../configs/routes';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PROJECT } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import MultipleSelect from "../../common/components/Select/MultipleSelect";
import Select from "../../common/components/Select/Select";



const ProductCreate = () => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false)


    const [valueCreate, setValueCreate] = useState<any>()


    const handleCreate = async (e: any) => {
        e.preventDefault()
        const formData = new FormData();
        const item = {
            "vendor_id": "8241",
            "name": "IPOD",
            "brand_id": "58",
            "condition_id": "292",
            "categories": [85],
            "description": "OK",
            "enabled": 1, "memberships": [4],
            "shipping_to_zones": [{ "id": 1, "price": "2.00" }],
            "tax_exempt": 1,
            "price": "100.00",
            "sale_price_type": "$",
            "arrival_date": "2022-03-21",
            "inventory_tracking": 0,
            "quantity": "1",
            "sku": "0392509152",
            "participate_sale": 1,
            "sale_price": "2.0000",
            "og_tags_type": "0",
            "og_tags": "",
            "meta_desc_type": "A",
            "meta_description": "",
            "meta_keywords": "",
            "product_page_title": "",
            "facebook_marketing_enabled": 0,
            "google_feed_enabled": 1,
            "imagesOrder": ["https://trainingpg.s3.ap-southeast-1.amazonaws.com/products/5243/o-0c7c76de-1647860999.jpg"],
            "id": "5243",
            "deleted_images": []
        }
        formData.append("productDetail", JSON.stringify(item))

        setLoading(true)
        const json = await dispatch(
            fetchThunk(API_PROJECT.productCreate, 'post', formData, true, 'multipart/form-data'),
        );
        if (json?.success) {
            console.log('OK')
            setLoading(false)
        }

    }


    const handleSubmit = (e:any) => {
        e.preventDefault()
        const formData = new FormData();
        const item = {
            "vendor_id": "8241",
            "name": "IPOD",
            "brand_id": "58",
            "condition_id": "292",
            "categories": [85],
            "description": "OK",
            "enabled": 1, "memberships": [4],
            "shipping_to_zones": [{ "id": 1, "price": "2.00" }],
            "tax_exempt": 1,
            "price": "100.00",
            "sale_price_type": "$",
            "arrival_date": "2022-03-21",
            "inventory_tracking": 0,
            "quantity": "1",
            "sku": "0392509152",
            "participate_sale": 1,
            "sale_price": "2.0000",
            "og_tags_type": "0",
            "og_tags": "",
            "meta_desc_type": "A",
            "meta_description": "",
            "meta_keywords": "",
            "product_page_title": "",
            "facebook_marketing_enabled": 0,
            "google_feed_enabled": 1,
            "imagesOrder": ["https://trainingpg.s3.ap-southeast-1.amazonaws.com/products/5243/o-0c7c76de-1647860999.jpg"],
            "id": "5243",
            "deleted_images": []
        }
        formData.set("productDetail", JSON.stringify(item))

        const xhr = new XMLHttpRequest();
        xhr.open("POST", API_PROJECT.productCreate, true);

        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.setRequestHeader("Authorization", "9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275");

        xhr.onreadystatechange = function () { 
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log('OK');
            }
        }
        xhr.send(formData);

    }



    const list_brand = [{ title: '', value: '' }]
    const list_condition = [{ title: '', value: '' }]
    const list_useCondition = [{ title: '', value: '' }]
    const list_category = [{ title: '', value: '' }]


    return (
        <div className="product-create">
            <div className="btn-back mb-2" onClick={() => dispatch(replace(ROUTES.product))}>
                <a><i className="fa-solid fa-arrow-left"></i></a>
            </div>
            <h4 className="title-big">Add Product</h4>
            <form onSubmit={handleSubmit}>
                <section className="part1">
                    <div className="form-group">
                        <label className="col-md-2">Vendor <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"

                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Product Title <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"

                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Brand <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <Select data={list_brand} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Condition <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <Select data={list_condition} />
                            <p className="help">Select Used Condition</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Used Conditions</label>
                        <div className="col-md-4 px-3">
                            <Select data={list_useCondition} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">SKU</label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"

                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Images <span className="star">*</span></label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Category <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <MultipleSelect data={list_category} placeholder='Type Vendor name to select' />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Description <span className="star">*</span></label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Available for sale</label>
                        <div className="col-md-4 px-3">
                            <input type='checkbox'></input>
                            {/* <i className="fa fa-question-circle icon-question"></i> */}
                        </div>
                    </div>

                </section>

                <div className="seperated-space"></div>

                <section className="part2">
                    <h4 className="my-3">Prices & Inventory</h4>
                    <div className="form-group">
                        <label className="col-md-2">Memberships</label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Tax class</label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Price <span className="start">*</span></label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Arrival date</label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Quantity in stock <span className="star">*</span></label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                </section>

                <div className="seperated-space"></div>

                <section className="part3">
                    <h4 className="my-3">Shipping</h4>
                    <div className="form-group">
                        <label className="col-md-2">Continental U.S. <span className="star">*</span></label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                </section>

                <div className="seperated-space"></div>

                <section className="part4">
                    <h4 className="my-3">Marketing</h4>
                    <div className="form-group">
                        <label className="col-md-2">Open Graph meta tags</label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Meta description</label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Meta keywords</label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"

                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Product page title</label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"

                            />
                            <p className="help">Leave blank to use product name as Page Title.</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Add to Facebook product feed</label>
                        <div className="col-md-4 px-3">
                            <input type='checkbox'></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Add to Google product feed</label>
                        <div className="col-md-4 px-3">
                            <input type='checkbox'></input>
                        </div>
                    </div>
                </section>
                <div className="sticky-panel">
                    <button type="submit" className="btn btn-warning">Add Product</button>
                </div>
            </form>
        </div>
    )
}

export default ProductCreate