import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PROJECT } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import Tab from '../../common/components/Tab/Tab';
import Loading from "../../common/components/Loading/Loading";
import InfoUser from "../components/UserDetails/InfoUser";


const UserDetails = () => {
    const [data, setData] = useState<any>();
    const params = useParams<{ id: string }>()

    const tabItems = [
        {
            id: 1,
            title: 'Account Details',
            content: <InfoUser data={data} />,
        },
        {
            id: 2,
            title: 'Address Book',
            content: <h4>Component 2</h4>,
        },
        {
            id: 3,
            title: 'My Shop Settings',
            content: <h4>Component 3</h4>,
        },
        {
            id: 4,
            title: 'Financial Details',
            content: <h4>Component 4</h4>,
        },
    ];


    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const getData = useCallback(async () => {
        setLoading(true)
        const json = await dispatch(
            fetchThunk(API_PROJECT.userDetails, 'post', params),
        );
        if (json.success) {
            setData(json)
        }
        setLoading(false)
    }, [params])

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="user-detail">
            {loading && <Loading />}
            <div className="btn-back mb-2" onClick={() => dispatch(replace(ROUTES.user))}>
                <a><i className="fa-solid fa-arrow-left"></i></a>
            </div>
            {data ?
                <>
                    <h4>{data.data.info.email}</h4>
                    <Tab tabItems={tabItems} />
                </>
                : null}

        </div>
    )
}

export default UserDetails