import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { replace } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';
import { API_PROJECT } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import TableUser from '../components/User/TableUser';
import UserFilter from '../components/User/UserFilter';
import '../css/Pages.css';
import { ROUTES } from '../../../configs/routes';
import Modal from '../../common/components/Modal/Modal';


function UserPage() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [valueDelete,setValueDelete] = useState({"params":[]})


    console.log(valueDelete.params.length);
    console.log(valueDelete);
    const [valueSearch, setValueSearch] = useState({
        page: 1,
        count: 5,
        search: "",
        memberships: [
        ],
        types: [
        ],
        status: [
        ],
        country: "",
        state: "",
        address: "",
        phone: "",
        date_type: "R",
        date_range: [
        ],
        sort: "last_login",
        order_by: "DESC",
        tz: 7
    })

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const getData = useCallback(async () => {
        setLoading(true)
        const json = await dispatch(
            fetchThunk(API_PROJECT.userList, 'post', valueSearch),
        );
        if (json.success) {
            setData(json.data.map((data: any) => ({
                id: data.profile_id,
                email: data.vendor,
                name: `${data.fistName} ${data.lastName}`,
                access_level: data.access_level,
                product: data.product,
                order: data.order.order_as_buyer,
                wishlist: data.wishlist,
                created: data.created,
                last_login: data.last_login,
                storename: data.storeName
            })))
            setLoading(false)
        }

    }, [valueSearch])

    const confirmRemove = async () => {
        setLoading(true)
        const json = await dispatch(
            fetchThunk(API_PROJECT.userDelete, 'post', valueDelete),
        );
        if(json?.success){
            console.log('OK')
            setLoading(false)
        }
        setOpenModal(false)
        getData()
    }

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className='user-manager'>
            {openModal &&
                <Modal
                    title='Confirm Delete'
                    content='Do you want to delete this user?'
                    setOpen={setOpenModal}
                    handleConfirm={confirmRemove}
                />}
            <h2 style={{ fontSize: '2rem', lineHeight: '2.5rem', marginBottom: '16px' }}>Search for users</h2>
            <UserFilter setValueSearch={setValueSearch} />
            <button type='button'
                className='btn btn-default mb-4'
                onClick={() => { dispatch(replace(ROUTES.user_create)) }}
            >
                Add User
            </button>
            <div style={{ overflowX: 'auto' }}>
                <TableUser datas={data} loading={loading} setValueDelete={setValueDelete}/>
            </div>
            <div className="above-scroller">
                <div style={{ width: '1600px', height: "20px" }}></div>
            </div>
            <div className="sticky-panel">
                <button type="button" disabled={valueDelete.params.length > 0 ? false : true}  onClick={()=>setOpenModal(true)} className="btn btn-warning">Remove Selected</button>
            </div>
        </div>
    )
}

export default UserPage;