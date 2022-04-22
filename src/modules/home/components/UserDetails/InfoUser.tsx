import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PROJECT } from '../../../../configs/api';
import { AppState } from '../../../../redux/reducer';
import { alertSuccess } from "../../../../utils/helper";
import Loading from '../../../common/components/Loading/Loading';
import MultipleSelect from "../../../common/components/Select/MultipleSelect";
import Select from "../../../common/components/Select/Select";
import { fetchThunk } from '../../../common/redux/thunk';

interface Props {
    data?: any
}
const InfoUser = ({ data }: Props) => {

    const params = useParams<{ id: string }>()
    const [valueUpdate, setValueUpdate] = useState(
        {
            "params": [
                {
                    "email": data.data.info.email,
                    "firstName": data.data.info.firstName,
                    "lastName": data.data.info.lastName,
                    "password": '',
                    "confirm_password": '',
                    "membership_id": data.data.info.membership_id,
                    "forceChangePassword": Number(data.data.info.forceChangePassword),
                    "taxExempt": Number(data.data.info.taxExempt),
                    "id": params.id,
                    "roles": data.data.info.roles,
                    "status": data.data.info.status,
                    "statusComment": data.data.info.statusComment
                }
            ]
        })


    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false)

    const handleUpdate = async () => {
        setLoading(true)
        const json = await dispatch(
            fetchThunk(API_PROJECT.userUpdate, 'post', valueUpdate),
        );
        if (json?.success) {
            setLoading(false)
            alertSuccess('Successful')
        }
    }


    const { E, D, U } = data.data.account_status
    const list_status = [
        { title: E, value: 'E' },
        { title: D, value: 'D' },
        { title: U, value: 'U' },
    ]
    const list_membership = [
        { title: "General", value: '4' },
        { title: "Ignore Membership", value: '' },
    ]
    const getMembership = (value: string) => {
        if(value == '4'){
            return {
                placeholder: 'General',
                defaultSelect: 0
            }
        }else{
            return {
                placeholder: 'Ignore Membership',
                defaultSelect: 1
            }
        }

    }


    const list_roles = data.data.account_roles.map((role: any, index: number) => {
        return {
            title: role.name,
            value: role.id
        }
    })

    const getAccess = (text: string) => {
        if (text === '100') {
            return 'Administrator'
        }
        if (text === '10') {
            return 'Vendor'
        }
    }
    return (
        <div className="infoUser">
            {loading && <Loading />}
            <section className="part1">
                <div className="form-group">
                    <label className="col-md-3">Orders placed as a buyer</label>
                    <div className="col-md-3 px-3">
                        <span>
                            <a className="link">{data.data.info.order_as_buyer} </a>
                            <span>{`$${data.data.info.order_as_buyer_total}`}</span>
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3">Vendor Income</label>
                    <div className="col-md-3 px-3">
                        <span>{`$${data.data.info.income}`}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3">Vendor Expense</label>
                    <div className="col-md-3 px-3">
                        <span>{`$${data.data.info.expense}`}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3"><a className="link">View transaction details</a></label>
                </div>
                <div className="form-group">
                    <label className="col-md-3">Earning balance</label>
                    <div className="col-md-3 px-3">
                        <span>{`$${data.data.info.earning}`}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3">Products listed as vendor</label>
                    <div className="col-md-3 px-3">
                        <span>
                            <a className="link">{`${data.data.info.products_total}`}</a>
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3">Joined</label>
                    <div className="col-md-3 px-3">
                        <span>{moment(Number(data.data.info.joined)).format('MMM D, YYYY, h:mm A')}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3">Last login</label>
                    <div className="col-md-3 px-3">
                        <span>{moment(Number(data.data.info.last_login)).format('MMM D, YYYY, h:mm A')}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3">Language</label>
                    <div className="col-md-3 px-3">
                        <span>{data.data.info.language}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3">Referer</label>
                    <div className="col-md-3 px-3">
                        <span>{data.data.info.referer}</span>
                    </div>
                </div>

            </section>
            <div className="seperated-space"></div>
            <form>
                <section className="part2">
                    <h6 className="my-3">Email & password</h6>
                    <div className="form-group">
                        <label className="col-md-3">Fist Name *</label>
                        <div className="col-md-3 px-3">
                            <input type="text"
                                className="insert"
                                value={valueUpdate.params[0].firstName}
                                onChange={(e) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], firstName: e.target.value }]
                                    }
                                })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Last Name *</label>
                        <div className="col-md-3 px-3">
                            <input type="text"
                                className="insert"
                                value={valueUpdate.params[0].lastName}
                                onChange={(e) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], lastName: e.target.value }]
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Email *</label>
                        <div className="col-md-3 px-3">
                            <input type="text"
                                className="insert"
                                value={valueUpdate.params[0].email}
                                onChange={(e) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], email: e.target.value }]
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Password</label>
                        <div className="col-md-3 px-3">
                            <input
                                type="password"
                                className="insert"
                                value={valueUpdate.params[0].password}
                                onChange={(e) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], password: e.target.value }]
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Confirm Password</label>
                        <div className="col-md-3 px-3">
                            <input
                                type="password"
                                className="insert"
                                value={valueUpdate.params[0].confirm_password}
                                onChange={(e) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], confirm_password: e.target.value }]
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Type</label>
                        <div className="col-md-3 px-3">
                            <span></span>
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
                <section className="part3">
                    <h6 className="my-3">Access information</h6>
                    <div className="form-group">
                        <label className="col-md-3">Access level</label>
                        <div className="col-md-3 px-3">
                            <span>{getAccess(data.data.info.access_level) || 'Vendor'}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Roles</label>
                        <div className="col-md-3 px-3">
                            <MultipleSelect data={list_roles} checkbox={true} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Account status <span className="star">*</span></label>
                        <div className="col-md-3 px-3">
                            <Select data={list_status}
                                placeholder={data.data.account_status[valueUpdate.params[0].status]}
                                defaultSelect={0}
                                onChange={(value) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], status: value }]
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Status comment (reason)</label>
                        <div className="col-md-4 px-3">
                            <textarea className="insert"
                                onChange={(e) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], statusComment: e.target.value }]
                                    }
                                })}
                            >
                                {data.data.info.statusComment}
                            </textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Membership</label>
                        <div className="col-md-3 px-3">
                            <Select
                                data={list_membership}
                                {...getMembership(data.data.info.membership_id)}
                                onChange={(value) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], membership_id:value }]
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Pending membership</label>
                        <div className="col-md-3 px-3">
                            <span>{data.data.info.pending_membership_id || 'none'}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3">Require to change password on next log in</label>
                        <div className="col-md-3 px-3">
                            <input type='checkbox'
                                value={valueUpdate.params[0].forceChangePassword}
                                onChange={(e) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], forceChangePassword: e.target.checked ? 1 : 0 }]
                                    }
                                })}
                            />
                        </div>
                    </div>
                </section>
                <div className="seperated-space"></div>
                <section className="part4">
                    <h6 className="my-3">Tax information</h6>
                    <div className="form-group">
                        <label className="col-md-3">Tax exempt</label>
                        <div className="col-md-3 px-3">
                            <input type="checkbox"
                                value={valueUpdate.params[0].taxExempt}
                                onChange={(e) => setValueUpdate(prev => {
                                    return {
                                        ...prev, params: [{ ...prev.params[0], taxExempt: e.target.checked ? 1 : 0 }]
                                    }
                                })}
                            />
                        </div>
                    </div>
                </section>
            </form>
            <div className="sticky-panel">
                <button onClick={handleUpdate} type="button" className="btn btn-warning">Update</button>
            </div>
        </div>
    )
}

export default InfoUser