import { replace } from 'connected-react-router';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { Action } from "typesafe-actions";
import { API_PROJECT } from "../../../../configs/api";
import { ROUTES } from "../../../../configs/routes";
import { AppState } from "../../../../redux/reducer";
import { alertSuccess } from "../../../../utils/helper";
import Editable from "../../../common/components/Editable/Editable";
import Loading from "../../../common/components/Loading/Loading";
import Modal from "../../../common/components/Modal/Modal";
import { fetchThunk } from "../../../common/redux/thunk";

interface Props {
    id: string,
    sku: string,
    name: string,
    category: string,
    price: string,
    in_stock: string,
    vendor: string,
    arrivalDate: string,
    enabled: string,
}
interface DataProps {
    datas: Array<Props> | undefined
    loading: boolean
    setValueDelete: React.Dispatch<React.SetStateAction<any>>
    setValueExport: React.Dispatch<React.SetStateAction<any>>
    setValueSearch: React.Dispatch<React.SetStateAction<any>>
    getData?: any
}

const TableProduct = (props: DataProps) => {
    const { datas, loading, setValueDelete, setValueExport, setValueSearch, getData } = props
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [selectDelete, setSelectDelete] = React.useState<readonly string[]>([]);

    const [openModal_Enable, setOpenModal_Enable] = useState(false)
    const [payloadUpdateEnable, setUpdateEnable] = useState<any>()
    const [payloadUpdatePS, setUpdatePS] = useState<any>([])
    const [sortBySku, setSortBySku] = useState('')
    const [sortByName, setSortByName] = useState('')



    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = datas?.map((data) => data.id);
            newSelecteds && setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };


    const handleSort = (type: any) => {

        switch (type) {
            case 'sku':
                if (sortBySku == '') {
                    setSortBySku('DESC')
                    setValueSearch((prev: any) => {
                        return { ...prev, sort: type, order_by: 'DESC' }
                    })
                } else {
                    if (sortBySku == 'ASC') {
                        setSortBySku('DESC')
                        setValueSearch((prev: any) => {
                            return { ...prev, sort: type, order_by: 'DESC' }
                        })
                    } else {
                        setSortBySku('ASC')
                        setValueSearch((prev: any) => {
                            return { ...prev, sort: type, order_by: 'ASC' }
                        })
                    }
                }
                setSortByName('')
                break
            case 'name':
                if (sortByName == '') {
                    setSortByName('DESC')
                    setValueSearch((prev: any) => {
                        return { ...prev, sort: type, order_by: 'DESC' }
                    })
                } else {
                    if (sortByName == 'ASC') {
                        setSortByName('DESC')
                        setValueSearch((prev: any) => {
                            return { ...prev, sort: type, order_by: 'DESC' }
                        })
                    } else {
                        setSortByName('ASC')
                        setValueSearch((prev: any) => {
                            return { ...prev, sort: type, order_by: 'ASC' }
                        })
                    }
                }
                setSortBySku('')
                break
        }

    }

    const handleSelect = (event: React.MouseEvent<unknown>, id: string, isBtnDel: boolean) => {
        if (isBtnDel) {
            const selectedIndex = selectDelete.indexOf(id);
            let newSelected: readonly string[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selectDelete, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selectDelete.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selectDelete.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selectDelete.slice(0, selectedIndex),
                    selectDelete.slice(selectedIndex + 1),
                );
            }
            setSelectDelete(newSelected)
        }
        else {
            const selectedIndex = selected.indexOf(id);
            let newSelected: readonly string[] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
            setSelected(newSelected)
        }
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;
    const willDelete = (id: string) => {
        return selectDelete.indexOf(id) !== -1 ? "toDelete" : ''
    }

    const handleDelete = (event: any, id: any) => {
        handleSelect(event, id, true)
    }

    const handleConfirmUpdate_Enable = async (id: any, enabled: any) => {
        const info = await dispatch(
            fetchThunk(API_PROJECT.productEdit, 'post', { params: [{ id: id, enable: +enabled == 1 ? 0 : 1 }] }),
        );

        if (info.success) {
            alertSuccess('Successful')
        }
        getData()
        setOpenModal_Enable(false)
    }

    useEffect(() => {
        setValueDelete({
            params: selectDelete.map((item) => {
                return { id: item, delete: 1 }
            })
        })
    }, [selectDelete,setValueDelete])

    useEffect(() => {
        setValueExport(selected)
    }, [selected,setValueExport])

    return (
        <>
            {openModal_Enable &&
                <Modal
                    title="Confirm Update"
                    content=" Do you want to update this product? "
                    setOpen={setOpenModal_Enable}
                    handleConfirm={() => handleConfirmUpdate_Enable(payloadUpdateEnable.id, payloadUpdateEnable.enabled)}
                />
            }
            <table className="table-list">
                <thead>
                    <tr>
                        <th scope="col"><input type='checkbox' onChange={handleSelectAllClick}></input></th>
                        <th scope="col"
                            className="canSort"
                            onClick={() => handleSort('sku')}
                        >
                            SKU
                            <i className={`icon-arrow fa-solid ${sortBySku == '' ? '' : sortBySku == 'ASC' ? "fa-arrow-up" : "fa-arrow-down"}`}></i>
                        </th>
                        <th scope="col"
                            className="custom-width canSort"
                            onClick={() => handleSort('name')}
                        >
                            Name
                            <i className={`icon-arrow fa-solid ${sortByName == '' ? '' : sortByName == 'ASC' ? "fa-arrow-up" : "fa-arrow-down"}`}></i>
                        </th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">In stock</th>
                        <th scope="col">Vendor</th>
                        <th scope="col">Arrival Date</th>
                    </tr>
                </thead>
                <tbody className="lines">
                    {loading ? <Loading /> : datas?.map((data, index) => {
                        const isItemSelected = isSelected(data.id);
                        const toDelete = willDelete(data.id);
                        return (
                            <tr key={data.id} className={toDelete}>
                                <td className="cell actions">
                                    <div className="left">
                                        <div className="pe-2">
                                            <input type='checkbox' onClick={(event) => handleSelect(event, data.id, false)} readOnly checked={isItemSelected} />
                                        </div>
                                        <div
                                            onClick={() => {
                                                setOpenModal_Enable(!openModal_Enable)
                                                setUpdateEnable({ id: data.id, enabled: data.enabled })
                                            }}
                                            className={`action-update ${data.enabled == '1' ? 'enabled' : ''}`}
                                        >
                                            <i className="fa fa-power-off"></i>
                                        </div>
                                    </div>
                                </td>
                                <td className="cell">{data.sku}</td>
                                <td className="cell custom-width">
                                    <a className="link" onClick={() => dispatch(replace(`${ROUTES.product_detail}/${data.id}`))}>{data.name}</a>
                                </td>
                                <td className="cell">{data.category}</td>
                                <td className="cell">
                                    <span>$</span>
                                    <Editable
                                        value={`${Number(data.price)}`}
                                        onBlur={(e: any) => {

                                        }}
                                    />

                                </td>
                                <td className="cell">
                                    <Editable
                                        value={data.in_stock}
                                        onBlur={(e: any) => {

                                        }}
                                    />
                                </td>
                                <td className="cell">
                                    <a className="link" onClick={() => dispatch(replace(`${ROUTES.user_detail}/${data.id}`))}>{data.vendor}</a>
                                </td>
                                <td className="cell">{moment(Number(data.arrivalDate)).format('MMM D, YYYY')}</td>
                                <td className="cell actions">
                                    <div className="right">
                                        <button className="btn btn-default" onClick={(event) => handleDelete(event, data.id)}><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </>
    )
}

export default TableProduct