import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeSelector } from "../../../redux/selector";
import { replace } from "connected-react-router";
import { ROUTES } from '../../../configs/routes';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PROJECT } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import MultipleSelect from "../../common/components/Select/MultipleSelect";
import Select from "../../common/components/Select/Select";
import Loading from '../../common/components/Loading/Loading';
import { toast, Slide } from 'react-toastify';



const ProductCreate = () => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false)
    const state = useSelector(storeSelector)

    const [valueCreate, setValueCreate] = useState(
        {
            "vendor_id": "8256",
            "name": "Test",
            "brand_id": "103",
            "condition_id": "292",
            "categories": [81],
            "description": "OK",
            "enabled": 1,
            "memberships": [4],
            "shipping_to_zones": [{ "id": 1, "price": "1" }],
            "tax_exempt": 0,
            "price": "100",
            "sale_price_type": "$",
            "arrival_date": "2022-03-24",
            "inventory_tracking": 0, "quantity": "1",
            "sku": "1648091505420",
            "participate_sale": 0,
            "sale_price": "",
            "og_tags_type": "0",
            "og_tags": "",
            "meta_desc_type": "A",
            "meta_description": "",
            "meta_keywords": "OK",
            "product_page_title": "OK",
            "facebook_marketing_enabled": 0,
            "google_feed_enabled": 0,
            "imagesOrder": ["https://trainingpg.s3.ap-southeast-1.amazonaws.com/products/5243/o-0c7c76de-1647860999.jpg"],
            "deleted_images": []
        })


    const handleCreate = (e: any) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();

        formData.append("productDetail", JSON.stringify(valueCreate))

        const xhr = new XMLHttpRequest();

        xhr.open("POST", API_PROJECT.productCreate);
        xhr.setRequestHeader("Authorization", `${state.auth.user_cookie}`);
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                setLoading(false)
                toast.success('Successful', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                    transition: Slide
                });
            }
        }
        xhr.send(formData);

    }


    const list_brand = state?.payload?.brand?.map((data: any) => {
        return { title: data.name, value: data.id }
    })
    const list_condition = [{ title: 'Used', value: '292' }]
    const list_useCondition = [{ title: 'Used', value: '292' }]
    const list_category = state?.payload?.category?.map((data: any) => {
        return { title: data.name, value: data.id }
    })
    const list_membership = [{ title: 'General', value: 4 }]
    const list_zone = state?.payload?.country?.map((data: any) => {
        return { title: data.country, value: data.id }
    })
    const list_Metatags = [{ title: 'Autogenerated', value: 'A' }]
    const list_MetaDescription = [{ title: 'Autogenerated', value: "A" }]


    return (
        <div className="product-create">
            {loading && <Loading />}
            <div className="btn-back mb-2" onClick={() => dispatch(replace(ROUTES.product))}>
                <a><i className="fa-solid fa-arrow-left"></i></a>
            </div>
            <h4 className="title-big">Add Product</h4>
            <form onSubmit={handleCreate}>
                <section className="part1">
                    <div className="form-group">
                        <label className="col-md-2">Vendor <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                placeholder="Type Vendor name to select"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Product Title <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                onChange={(e) => { setValueCreate(prev => ({ ...prev, name: e.target.value })) }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Brand <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <Select
                                data={list_brand}
                                onChange={(value) => { setValueCreate(prev => ({ ...prev, brand_id: value })) }}
                                placeholder='Type Brand name to select'
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Condition <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <Select
                                data={list_condition}
                                onChange={(value) => { setValueCreate(prev => ({ ...prev, condition_id: value })) }}
                            />
                            <p className="help">Select Used Condition</p>
                        </div>
                    </div>
                    {valueCreate.condition_id &&
                        <div className="form-group">
                            <label className="col-md-2">Used Conditions</label>
                            <div className="col-md-4 px-3">
                                <Select data={list_useCondition} />
                            </div>
                        </div>}

                    <div className="form-group">
                        <label className="col-md-2">SKU</label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                onChange={(e) => { setValueCreate(prev => ({ ...prev, sku: e.target.value })) }}
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
                            <MultipleSelect
                                data={list_category}
                                placeholder='Type Vendor name to select'
                                onChange={(value) => { setValueCreate(prev => ({ ...prev, categories: value })) }}

                            />
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
                            <input type='checkbox'
                                onChange={(e) => setValueCreate(prev => ({ ...prev, enabled: e.target.checked ? 1 : 0 }))}

                            />
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
                            <Select
                                data={list_membership}
                                placeholder={list_membership[0].title}
                                defaultSelect={0}
                                checkbox
                                onChange={(value) => { setValueCreate(prev => ({ ...prev, memberships: value })) }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Tax class</label>
                        <div className="col-md-4 px-3 d-flex align-items-center">
                            <span className="me-3" style={{ flex: 1 }}>Default</span>
                            <span className="me-2">Tax Exempt</span>
                            <input type='checkbox'
                                onChange={(e) => setValueCreate(prev => ({ ...prev, tax_exempt: e.target.checked ? 1 : 0 }))}
                            />

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Price <span className="start">*</span></label>
                        <div className="col-md-4 px-3  d-flex align-items-center">
                            <input type="text"
                                style={{ flex: '1' }}
                                className="insert col-md-2"
                                onChange={(e) => { setValueCreate(prev => ({ ...prev, price: `${Number(e.target.value).toFixed(2)}` })) }}
                            />
                            <span className="mx-2">Sale</span>
                            <input type='checkbox'
                                onChange={(e) => setValueCreate(prev => ({ ...prev, participate_sale: e.target.checked ? 1 : 0 }))}
                            />
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
                            <input type="text"
                                className="insert"
                                onChange={(e) => { setValueCreate(prev => ({ ...prev, quantity: e.target.value })) }}
                            />
                        </div>
                    </div>
                </section>

                <div className="seperated-space"></div>

                <section className="part3">
                    <h4 className="my-3">Shipping</h4>
                    <div className="form-group">
                        <label className="col-md-2">Continental U.S. <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                onChange={(e) =>
                                    setValueCreate({ ...valueCreate, shipping_to_zones: [{ ...valueCreate.shipping_to_zones[0], price: e.target.value }] })
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2"></label>
                        <div className="col-md-3 px-3">
                            <Select data={list_zone}
                                placeholder={'Autogenerated'}
                                defaultSelect={0}
                                onChange={(value) =>
                                    setValueCreate({ ...valueCreate, shipping_to_zones: [{ ...valueCreate.shipping_to_zones[0], id: value }] })
                                }
                            />
                        </div>
                        <div className="col-md-3">Add Shipping Location</div>
                    </div>
                </section>

                <div className="seperated-space"></div>

                <section className="part4">
                    <h4 className="my-3">Marketing</h4>
                    <div className="form-group">
                        <label className="col-md-2">Open Graph meta tags</label>
                        <div className="col-md-4 px-3">
                            <Select data={list_Metatags}
                                placeholder={'Autogenerated'}
                                defaultSelect={0}
                                onChange={(value) =>
                                    setValueCreate({ ...valueCreate, meta_desc_type: value })
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Meta description</label>
                        <div className="col-md-4 px-3">
                            <Select data={list_MetaDescription}
                                placeholder={'Autogenerated'}
                                defaultSelect={0}
                                onChange={(value) =>
                                    setValueCreate({ ...valueCreate, meta_description: value })
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Meta keywords</label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                onChange={(e) => setValueCreate({ ...valueCreate, meta_keywords: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Product page title</label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                onChange={(e) => setValueCreate({ ...valueCreate, product_page_title: e.target.value })}
                            />
                            <p className="help">Leave blank to use product name as Page Title.</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Add to Facebook product feed</label>
                        <div className="col-md-4 px-3">
                            <input type='checkbox'
                                onChange={(e) => setValueCreate({ ...valueCreate, facebook_marketing_enabled: e.target.checked ? 1 : 0 })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Add to Google product feed</label>
                        <div className="col-md-4 px-3">
                            <input type='checkbox'
                                onChange={(e) => setValueCreate({ ...valueCreate, google_feed_enabled: e.target.checked ? 1 : 0 })}
                            />
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