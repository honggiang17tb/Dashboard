import React from "react";
import MultipleSelect from "../../../common/components/Select/MultipleSelect";
import Select from "../../../common/components/Select/Select";


interface Props {
    data? :any
}

const InfoProduct = ({ data }: Props) => {

    const list_brand = [{title:'',value:''}]
    const list_condition = [{title:'',value:''}]
    const list_category = [{title:'',value:''}]
    const list_membership = [{title:'',value:''}]
    const list_country = [{title:'',value:''}]
    const list_openGraph = [{title:'',value:''}]
    const list_metaDescription = [{title:'',value:''}]

    return (
        <div className="infoProduct">
            <form>
                <section className="part1">
                    <div className="form-group">
                        <label className="col-md-2">Vendor <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                            <input type="text"
                                placeholder="Type Vendor name to select"
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
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Condition <span className="star">*</span></label>
                        <div className="col-md-4 px-3">
                           
                            <p className="help">Select Used Condition</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Used Conditions</label>
                        <div className="col-md-4 px-3">

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
                            <MultipleSelect data={list_category} />
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
                            <MultipleSelect data={list_membership} checkbox={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Tax class</label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Price <span className="star">*</span></label>
                        <div className="col-md-2 px-3">
                            <input type="text"
                                className="insert"

                            />
                        </div>
                        <label className="col-md-1">
                            <input type="checkbox" className="me-2" />Sale
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Arrival date</label>
                        <div className="col-md-4 px-3">

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Quantity in stock <span className="star">*</span></label>
                        <div className="col-md-2 px-3">
                            <input type="text"
                                className="insert"

                            />
                        </div>
                    </div>
                </section>

                <div className="seperated-space"></div>

                <section className="part3">
                    <h4 className="my-3">Shipping</h4>
                    <div className="form-group">
                        <label className="col-md-2">Continental U.S. <span className="star">*</span></label>
                        <div className="col-md-2 px-3">
                            <input type="text"
                                className="insert"

                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2"></label>
                        <div className="col-md-3 px-3">
                            <Select data={list_country} placeholder="Select new zone" />
                        </div>
                        <label className="col-md-3 px-3">
                            Add Shipping Location
                        </label>
                    </div>
                </section>

                <div className="seperated-space"></div>

                <section className="part4">
                    <h4 className="my-3">Marketing</h4>
                    <div className="form-group">
                        <label className="col-md-2">Open Graph meta tags</label>
                        <div className="col-md-4 px-3">
                            <Select data={list_openGraph} placeholder='Autogenerated' defaultSelect={0}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2">Meta description</label>
                        <div className="col-md-4 px-3">
                            <Select data={list_metaDescription} placeholder='Autogenerated' defaultSelect={0}/>
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
                </section>
                <div className="sticky-panel">
                    <button type="button" className="btn btn-warning">Update Product</button>
                </div>
            </form>
        </div>
    )
}

export default InfoProduct