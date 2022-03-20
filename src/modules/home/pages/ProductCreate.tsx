import React from "react";
import { useDispatch } from "react-redux";
import { replace } from "connected-react-router";
import { ROUTES } from '../../../configs/routes';
import MultipleSelect from "../../common/components/Select/MultipleSelect";
import Select from "../../common/components/Select/Select";

const ProductCreate = () => {
    const dispatch = useDispatch()


    const list_brand = [{title:'',value:''}]
    const list_condition = [{title:'',value:''}]
    const list_useCondition = [{title:'',value:''}]
    const list_category = [{title:'',value:''}]


    return (
        <div className="product-create">
            <div className="btn-back mb-2" onClick={() => dispatch(replace(ROUTES.product))}>
                <a><i className="fa-solid fa-arrow-left"></i></a>
            </div>
            <h4 className="title-big">Add Product</h4>
            <form>
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
                            <Select data={list_condition}/>
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
                            <MultipleSelect data={list_category} placeholder='Type Vendor name to select'/>
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
                    <button type="button" className="btn btn-warning">Add Product</button>
                </div>
            </form>
        </div>
    )
}

export default ProductCreate