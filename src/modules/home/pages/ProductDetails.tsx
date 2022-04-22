import React, { useCallback, useEffect, useState } from "react";
import { replace } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PROJECT } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import Loading from "../../common/components/Loading/Loading";
import Tab from '../../common/components/Tab/Tab';
import { fetchThunk } from '../../common/redux/thunk';
import InfoProduct from "../components/ProductDetails/InfoProduct";


const ProductDetails = () => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const params = useParams<{ id: string }>()


    const getData = useCallback(async () => {
        setLoading(true)
        const json = await dispatch(
            fetchThunk(API_PROJECT.productDetails, 'post', params),
        );
        if (json.success) {
            setData(json)
        }
        setLoading(false)
    }, [params])

    useEffect(() => {
        getData()
    }, [])


    const tabItems = [
        {
            id: 1,
            title: 'Info',
            content: <InfoProduct data={data}/>,
        },
        {
            id: 2,
            title: 'Attachments',
            content: <h4>Attachments</h4>,
        },
    ];

    return (
        <div className="product-detail">
            {loading && <Loading />}
            <div className="btn-back mb-2" onClick={() => dispatch(replace(ROUTES.product))}>
                <a><i className="fa-solid fa-arrow-left"></i></a>
            </div>
            {data ?
                <>
                    <h4>{data.data.name}</h4>
                    <Tab tabItems={tabItems} />
                </>
                : null}
        </div>
    )
}

export default ProductDetails