import React, { useState, useEffect, useCallback } from 'react';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS,API_PROJECT } from '../../../configs/api';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';

interface Props {}

function UserPage(props:Props) {
    
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const getData= useCallback(async ()=>{
        const json = await dispatch(
            fetchThunk(API_PROJECT.userList, 'get'),
          );
          console.log(json);
    },[]) 


    return (
        <div>
            <h1>User Page</h1>
        </div>
    )
}

export default UserPage;