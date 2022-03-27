import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { storeSelector } from "../../../../redux/selector";
import { API_PROJECT } from '../../../../configs/api';
import Select from "../../../common/components/Select/Select";
import MultipleSelect from "../../../common/components/Select/MultipleSelect";
import Loading from '../../../common/components/Loading/Loading';
import { toast, Slide } from 'react-toastify';
import TextEditor from "../../../common/components/TextEditor/TextEditor";
import { ImageUpload } from "../../../common/components/ImageUpload/ImageUpload";


interface Props {
    data?: any
}

const InfoProduct = ({ data }: Props) => {

    const payload = data.data
    const state = useSelector(storeSelector)

    const [loading, setLoading] = useState(false)
    const [disableBtn, setDisableBtn] = useState(true)
    const [valueUpdate, setValueUpdate] = useState(
        {
            "vendor_id": payload.vendor_id,
            "name": payload.name,
            "brand_id": payload.brand_id,
            "condition_id": payload.condition_id,
            "categories": payload.categories,
            "description": payload.description,
            "enabled": payload.enabled,
            "memberships": payload.memberships,
            "shipping_to_zones": payload.shipping,
            "tax_exempt": payload.tax_exempt,
            "price": payload.price,
            "sale_price_type": payload.sale_price_type,
            "arrival_date": payload.arrival_date,
            "inventory_tracking": payload.inventory_tracking,
            "quantity": payload.quantity,
            "sku": payload.sku,
            "participate_sale": payload.participate_sale,
            "sale_price": payload.sale_price,
            "og_tags_type": payload.og_tags_type,
            "og_tags": payload.og_tags,
            "meta_desc_type": payload.meta_desc_type,
            "meta_description": payload.meta_description,
            "meta_keywords": payload.meta_keywords,
            "product_page_title": payload.product_page_title,
            "facebook_marketing_enabled": payload.facebook_marketing_enabled,
            "google_feed_enabled": payload.google_feed_enabled,
            "imagesOrder": payload.images,
            "id": payload.id,
            "deleted_images": []
        })

        // console.log(valueUpdate);
        

    const handleUpdate = (e: any) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();

        formData.append("productDetail", JSON.stringify(valueUpdate))

        const xhr = new XMLHttpRequest();

        xhr.open("POST", API_PROJECT.productUpdate);
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

    const upload = (image:any,order:any) => {
        const formData = new FormData();

        formData.append("productId", `${payload.id}`)
        formData.append("order", `${order}`)
        formData.append("images[]", image as BinaryType)

        const xhr = new XMLHttpRequest();

        xhr.open("POST", API_PROJECT.upload_image);
        xhr.setRequestHeader("Authorization", `${state.auth.user_cookie}`);
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

                console.log('OK');

            }
        }
        xhr.send(formData);

    }


    const getVendor = (id: any) => {
        let name = ''
        if (state.payload.vendor) {
            state.payload.vendor.forEach((item: any) => {
                if (item.id == id) {
                    name = item.name
                }
            })
        }
        return name
    }
    const getBrand = (id: any) => {
        let brand = ''
        let index = 0
        if (state.payload.brand) {
            state.payload.brand.forEach((item: any, i: any) => {
                if (item.id == id) {
                    brand = item.name
                    index = i
                }
            })
        }
        return {
            placeholder: brand,
            defaultSelect: index
        }
    }

    const list_brand = state?.payload?.brand?.map((data: any) => {
        return {
            title: data.name,
            value: data.id
        }
    })
    const list_condition = [{ title: 'Used', value: '292' }]
    const list_useCondition = [{ title: 'Used', value: '' }]
    const list_category = state?.payload?.category?.map((data: any) => {
        return {
            title: data.name,
            value: data.id
        }
    })
    const list_membership = [{ title: 'General', value: 4 }]
    const list_zone = state?.payload?.shipping?.map((data: any) => {
        return {
            title: data.name,
            value: data.id
        }
    })
    const list_Metatags = [{ title: 'Autogenerated', value: 'A' }]
    const list_MetaDescription = [{ title: 'Autogenerated', value: '' }]
    const list_images = data.data.images.map((item: any) => {
        return { dataURL: item.thumbs[0],file:item.file,id:item.id }
    })


    useEffect(() => {
        setDisableBtn(false)
    }, [valueUpdate])

    return (
        <div className="infoProduct">
            {loading && <Loading />}
            <form onSubmit={handleUpdate}>
                <section className="part1">
                    <div className="form-group">
                        <label className="col-md-2">Vendor <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                value={getVendor(valueUpdate.vendor_id)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Product Title <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                value={valueUpdate.name}
                                onChange={(e) => { setValueUpdate((prev: any) => ({ ...prev, name: e.target.value })) }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Brand <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <Select
                                data={list_brand}
                                onChange={(value) => { setValueUpdate((prev: any) => ({ ...prev, brand_id: value })) }}
                                {...getBrand(valueUpdate.brand_id)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Condition <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <Select
                                data={list_condition}
                                placeholder='Used'
                                defaultSelect={0}
                                onChange={(value) => { setValueUpdate((prev: any) => ({ ...prev, condition_id: value })) }}
                            />
                            <p className="help">Select Used Condition</p>
                        </div>
                    </div>
                    {valueUpdate.condition_id &&
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
                                value={valueUpdate.sku}
                                onChange={(e) => { setValueUpdate((prev: any) => ({ ...prev, sku: e.target.value })) }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Images <span className="star">*</span></label>
                        <div className="col-md-8 px-3">
                            <ImageUpload
                                data={list_images}
                                setValueUpdate={setValueUpdate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Category <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <MultipleSelect
                                data={list_category}
                                placeholder='Type Vendor name to select'
                                onChange={(value) => { setValueUpdate((prev: any) => ({ ...prev, categories: value })) }}

                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ position: "relative" }}>
                        <label className="col-md-2">Description <span className="star">*</span></label>
                        <div className="col-md-6 px-3">
                            <TextEditor
                                value={valueUpdate.description}
                                onBlur={(value: any) => { setValueUpdate((prev: any) => ({ ...prev, description: value })) }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Available for sale</label>
                        <div className="col-md-4 px-3">
                            <input
                                checked={valueUpdate.enabled === '1' ? true : false}
                                type='checkbox'
                                onChange={(e) => setValueUpdate((prev: any) => ({ ...prev, enabled: e.target.checked ? 1 : 0 }))}

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
                                checkbox
                                onChange={(value) => { setValueUpdate((prev: any) => ({ ...prev, memberships: value })) }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Tax class</label>
                        <div className="col-md-4 px-3 d-flex align-items-center">
                            <span className="me-3" style={{ flex: 1 }}>Default</span>
                            <span className="me-2">Tax Exempt</span>
                            <input type='checkbox'
                                checked={valueUpdate.tax_exempt === '1' ? true : false}
                                onChange={(e) => setValueUpdate((prev: any) => ({ ...prev, tax_exempt: e.target.checked ? 1 : 0 }))}
                            />

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Price <span className="start">*</span></label>
                        <div className="col-md-4 px-3  d-flex align-items-center">
                            <input type="text"
                                style={{ flex: '1' }}
                                className="insert col-md-2"
                                value={Number(valueUpdate.price).toFixed(2)}
                                onChange={(e) => { setValueUpdate((prev: any) => ({ ...prev, price: `${Number(e.target.value).toFixed(2)}` })) }}
                            />
                            <span className="mx-2">Sale</span>
                            <input type='checkbox'
                                checked={valueUpdate.participate_sale === '1' ? true : false}
                                onChange={(e) => setValueUpdate((prev: any) => ({ ...prev, participate_sale: e.target.checked ? 1 : 0 }))}
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
                                value={valueUpdate.quantity}
                                onChange={(e) => { setValueUpdate((prev: any) => ({ ...prev, quantity: e.target.value })) }}
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
                                    setValueUpdate({ ...valueUpdate, shipping_to_zones: [{ ...valueUpdate.shipping_to_zones[0], price: e.target.value }] })
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2"></label>
                        <div className="col-md-3 px-3">
                            <Select
                                data={list_zone}
                                placeholder='Select new zone'
                                defaultSelect={0}
                                onChange={(value) => {
                                    setValueUpdate({ ...valueUpdate, shipping_to_zones: [{ ...valueUpdate.shipping_to_zones[0], id: value }] })
                                }}
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
                                    setValueUpdate({ ...valueUpdate, meta_desc_type: value })
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
                                    setValueUpdate({ ...valueUpdate, meta_description: value })
                                }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Meta keywords</label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                value={valueUpdate.meta_keywords}
                                onChange={(e) => setValueUpdate({ ...valueUpdate, meta_keywords: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Product page title</label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                className="insert"
                                value={valueUpdate.product_page_title}
                                onChange={(e) => setValueUpdate({ ...valueUpdate, product_page_title: e.target.value })}
                            />
                            <p className="help">Leave blank to use product name as Page Title.</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Add to Facebook product feed</label>
                        <div className="col-md-4 px-3">
                            <input type='checkbox'
                                checked={valueUpdate.facebook_marketing_enabled == '1' ? true : false}
                                onChange={(e) => setValueUpdate({ ...valueUpdate, facebook_marketing_enabled: e.target.checked ? 1 : 0 })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Add to Google product feed</label>
                        <div className="col-md-4 px-3">
                            <input type='checkbox'
                                checked={valueUpdate.google_feed_enabled == '1' ? true : false}
                                onChange={(e) => setValueUpdate({ ...valueUpdate, google_feed_enabled: e.target.checked ? 1 : 0 })}
                            />
                        </div>
                    </div>
                </section>
                <div className="sticky-panel">
                    <button disabled={disableBtn} type="submit" className="btn btn-warning">Update Product</button>
                </div>
            </form>
        </div>
    )
}

export default InfoProduct