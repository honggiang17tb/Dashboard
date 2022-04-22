import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PROJECT } from "../../../../configs/api";
import { AppState } from "../../../../redux/reducer";
import { storeSelector } from "../../../../redux/selector";
import Select from "../../../common/components/Select/Select";
import { fetchThunk } from "../../../common/redux/thunk";


interface Props {
    valueSearch: any
    setValueSearch: React.Dispatch<React.SetStateAction<any>>
}

const UserFilter = ({ valueSearch, setValueSearch }: Props) => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [extend, setExtend] = useState(false)
    const state = useSelector(storeSelector)
    const [valueFilter, setValueFilter] = useState(valueSearch)
    const [city, setCity] = useState<any>([])

    useEffect(() => {
        setValueFilter(valueSearch)
    }, [valueSearch])

    const handleSearch = async (e: any) => {
        e.preventDefault()
        setValueSearch(valueFilter)
    }

    const getState = async (state: any) => {
        const json = await dispatch(
            fetchThunk(API_PROJECT.state, 'post', { code: state }),
        );
        if (json?.success) {
            setCity(json.data.map((data: any) => {
                return {
                    title:data.state,
                    value:data.state
                }
            }))
        }
    }

    const list_status = [
        { title: 'Any status', value: 'null' },
        { title: 'Enable', value: 'E' },
        { title: 'Disable', value: 'D' },
        { title: 'Unapproved vendor', value: 'U' },
    ]
    
    const list_country = state?.payload?.country?.map((data: any) => {
        return {
            title: data.country,
            value: data.code
        }
    })

    return (
        <form >
            <div className='filter'>
                <ul>
                    <li style={{ width: '50%', marginRight: '20px' }}>
                        <input type='text'
                            placeholder="Search keywords"
                            value={valueFilter.search}
                            onChange={(e) => setValueFilter((prev: any) => ({ ...prev, search: e.target.value }))}
                        />
                    </li>
                    <li style={{ width: '50%', marginRight: '20px' }}>
                        <select value=''>
                            <option >All membership</option>
                        </select>
                    </li>
                    <li style={{ width: '50%', marginRight: '20px' }}>
                        <select value=''>
                            <option >All user types</option>
                        </select>
                    </li>
                    <li style={{ width: '35%', marginRight: '20px' }}>
                        <Select
                            data={list_status}
                            defaultSelect={0}
                            placeholder={'Any status'}
                            onChange={(value) => setValueFilter((prev: any) => ({ ...prev, status: [value] }))}
                        />
                    </li>
                    <li>
                        <button className='btn btn-default btn-search' onClick={handleSearch}>Search</button>
                    </li>
                </ul>
                <a className='arrow' aria-expanded={extend} onClick={() => setExtend(!extend)} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-controls="collapseExample"></a>
                <div className="collapse" id="collapseExample">
                    <div className='hidden filter_user'>
                        <ul className="filter_conditions">
                            <li className="by_userInfo px-3">
                                <ul>
                                    <li>
                                        <label className="me-3">Country</label>
                                        <Select
                                            data={list_country}
                                            placeholder={'Select country'}
                                            onChange={(value) => {
                                                setValueFilter((prev: any) => ({ ...prev, country: value }))
                                                getState(value)
                                            }}
                                        />
                                    </li>
                                    {valueFilter.country ?
                                        <li>
                                            <label className="me-3">State</label>
                                            <Select
                                                data={city}
                                                onChange={(value) => {
                                                    setValueFilter((prev: any) => ({ ...prev, state: value }))
                                                }}
                                            />
                                        </li>
                                        : null}
                                    <li>
                                        <label className="me-3">Address</label>
                                        <input type='text'
                                            value={valueFilter.address}
                                            onChange={(e) => setValueFilter((prev: any) => ({ ...prev, address: e.target.value }))}
                                        />
                                    </li>
                                    <li>
                                        <label className="me-3">Phone</label>
                                        <input type='text'
                                            value={valueFilter.phone}
                                            onChange={(e) => setValueFilter((prev: any) => ({ ...prev, phone: e.target.value }))}
                                        />
                                    </li>
                                </ul>
                            </li>
                            <li className="by_userActivity d-flex">
                                <label >User Activity</label>
                                <div>
                                    <ul className='d-flex'>
                                        <li className="d-flex align-items-center me-3">
                                            <input type='radio'
                                                className="me-2"
                                                value={'registry'}
                                                name='sort'
                                                onChange={(e) => setValueFilter((prev: any) => {

                                                    return { ...prev, sort: e.target.value }
                                                })}
                                            />
                                            <label>Register</label>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <input type='radio'
                                                className="me-2"
                                                value={'last_login'}
                                                name='sort'
                                                onChange={(e) => setValueFilter((prev: any) => {

                                                    return { ...prev, sort: e.target.value }
                                                })}
                                            />
                                            <label>Last Login</label>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </form >
    )
}

export default UserFilter