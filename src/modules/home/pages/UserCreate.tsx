import { replace } from 'connected-react-router';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PROJECT } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import Loading from '../../common/components/Loading/Loading';
import Select from "../../common/components/Select/Select";


const UserCreate = () => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false)

    const [valueCreate, setValueCreate] = useState(
        {
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "confirm_password": "",
            "membership_id": "",
            "forceChangePassword": 0,
            "taxExempt": 0,
            "paymentRailsType": "individual",
            "access_level": "100"
        })


    const handleCreate = async () => {
        setLoading(true)
        const json = await dispatch(
            fetchThunk(API_PROJECT.userCreate, 'post', valueCreate),
        );
        if(json?.success){
            console.log('OK')
            setLoading(false)
        }
        dispatch(replace(ROUTES.user))
    }
    const list_type = [{ title: 'Individual', value: 'individual' },{ title: 'Business', value: 'business' }]
    const list_accessLevel = [{ title: 'Admin', value: '100' },{ title: 'Vendor', value: '10' }]
    const list_membership = [{ title: 'Ignore Membership', value: 'null' },{ title: 'General', value: '4' }]

    return (
        
        <div className="user-create">
            {loading && <Loading/>}
            <div className="btn-back mb-2" onClick={() => dispatch(replace(ROUTES.user))}>
                <a><i className="fa-solid fa-arrow-left"></i></a>
            </div>
            <h4 className="title-big">Create profile</h4>
            <h6 className="my-3">Email & password</h6>
            <form>
                <section className="part1">
                    <div className="form-group">
                        <label className="col-md-3">Fist Name <span>*</span></label>
                        <div className="col-md-3 px-3">
                            <input type="text"
                                className="insert"
                                value={valueCreate.firstName}
                                onChange={(e) => setValueCreate(prev => ({ ...prev, firstName: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Last Name <span>*</span></label>
                        <div className="col-md-3 px-3">
                            <input type="text"
                                className="insert"
                                value={valueCreate.lastName}
                                onChange={(e) => setValueCreate(prev => ({ ...prev, lastName: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Email<span>*</span></label>
                        <div className="col-md-3 px-3">
                            <input type="text"
                                className="insert"
                                value={valueCreate.email}
                                onChange={(e) => setValueCreate(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Password<span>*</span></label>
                        <div className="col-md-3 px-3">
                            <input type="password"
                                className="insert"
                                value={valueCreate.password}
                                onChange={(e) => setValueCreate(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Confirm Password<span>*</span></label>
                        <div className="col-md-3 px-3">
                            <input type="password"
                                className="insert"
                                value={valueCreate.confirm_password}
                                onChange={(e) => setValueCreate(prev => ({ ...prev, confirm_password: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Type</label>
                        <div className="col-md-3 px-3">
                            <Select data={list_type} defaultSelect={0} placeholder={'Individual'}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">PaymentRails ID</label>
                        <div className="col-md-3 px-3">
                            <span></span>
                        </div>
                    </div>
                </section>
                <div className="seperated-space"></div>
                <section className="part2">
                    <h6 className="my-3">Access information</h6>
                    <div className="form-group">
                        <label className="col-md-3">Access level <span>*</span></label>
                        <div className="col-md-3 px-3">
                            <Select data={list_accessLevel} defaultSelect={1} placeholder={'Vendor'}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Membership</label>
                        <div className="col-md-3 px-3">
                            <Select data={list_membership} defaultSelect={0} placeholder={'Ignore Membership'}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Require to change password on next log in</label>
                        <div className="col-md-3 px-3">
                            <input type='checkbox'
                                value={valueCreate.forceChangePassword}
                                onChange={(e) => setValueCreate(prev => ({ ...prev, forceChangePassword: e.target.checked ? 1 : 0 }))}
                            />
                        </div>
                    </div>
                </section>
                <div className="seperated-space"></div>
                <section className="part3">
                    <h6 className="my-3">Tax information</h6>
                    <div className="form-group">
                        <label className="col-md-3">Tax exempt</label>
                        <div className="col-md-3 px-3">
                            <input type='checkbox'
                                value={valueCreate.taxExempt}
                                onChange={(e) => setValueCreate(prev => ({ ...prev, taxExempt: e.target.checked ? 1 : 0 }))}
                            />
                        </div>
                    </div>
                </section>
            </form>
            <div className="sticky-panel">
                <button type="button"
                    className="btn btn-warning"
                    onClick={handleCreate}
                >
                    Create account
                </button>
            </div>
        </div>
    )
}

export default UserCreate