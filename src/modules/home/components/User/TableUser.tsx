import React, { useEffect, useState } from "react";
import { ROUTES } from "../../../../configs/routes";
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router';
import moment from 'moment'
import Loading from "../../../common/components/Loading/Loading";

interface Props {
    id: string,
    email: string,
    name: string,
    access_level: string,
    product: number,
    order: number,
    wishlist: string,
    created: string,
    last_login: number,
    storename: string
}
interface DataProps {
    datas: Array<Props> | undefined
    loading: boolean
    setValueDelete: React.Dispatch<React.SetStateAction<any>>
    setValueSearch: React.Dispatch<React.SetStateAction<any>>
}
const TableUser = (props: DataProps) => {
    const { datas, loading, setValueDelete, setValueSearch } = props

    const dispatch = useDispatch()
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [sortByVendor, setSortByVendor] = useState('')
    const [sortByName, setSortByName] = useState('')

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = datas?.map((data) => data.id);
            newSelecteds && setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelect = (event: React.MouseEvent<unknown>, id: string) => {
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

        setSelected(newSelected);

    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const handleDelete = (event: any, id: any) => {
        handleSelect(event, id)
    }

    const handleSort = (type: any) => {

        switch (type) {
            case 'vendor':
                if (sortByVendor == '') {
                    setSortByVendor('DESC')
                    setValueSearch((prev: any) => {
                        return { ...prev, sort: type, order_by: 'DESC' }
                    })
                } else {
                    if (sortByVendor == 'ASC') {
                        setSortByVendor('DESC')
                        setValueSearch((prev: any) => {
                            return { ...prev, sort: type, order_by: 'DESC' }
                        })
                    } else {
                        setSortByVendor('ASC')
                        setValueSearch((prev: any) => {
                            return { ...prev, sort: type, order_by: 'ASC' }
                        })
                    }
                }
                setSortByName('')
                break
            case 'fistName':
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
                setSortByVendor('')
                break
        }

    }

    useEffect(() => {
        setValueDelete({
            params: selected.map((item) => {
                return { id: item, delete: 1 }
            })
        })
    }, [selected])

    return (
        <div style={{ overflowX: 'auto' }}>
            <table className="table-list">
                <thead>
                    <tr>
                        <th scope="col"><input type='checkbox' onChange={handleSelectAllClick}></input></th>
                        <th scope="col"
                            className="canSort"
                            onClick={() => handleSort('vendor')}
                        >
                            Login/Email
                            <i className={`icon-arrow fa-solid ${sortByVendor == '' ? '' : sortByVendor == 'ASC' ? "fa-arrow-up" : "fa-arrow-down"}`}></i>
                        </th>
                        <th scope="col"
                            className="canSort"
                            onClick={() => handleSort('fistName')}
                        >
                            Name
                            <i className={`icon-arrow fa-solid ${sortByName == '' ? '' : sortByName == 'ASC' ? "fa-arrow-up" : "fa-arrow-down"}`}></i>
                        </th>
                        <th scope="col">Access level</th>
                        <th scope="col">Products</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Wishlist</th>
                        <th scope="col">Created</th>
                        <th scope="col">Last Login</th>
                    </tr>
                </thead>
                <tbody className="lines">
                    {loading ? <Loading /> : datas?.map((data) => {
                        const isItemSelected = isSelected(data.id);
                        return (
                            <tr key={data.id} className={isItemSelected ? 'toDelete' : ''}>
                                <td className="cell actions">
                                    <div className="left pe-2">
                                        <input type='checkbox' onClick={(event) => handleSelect(event, data.id)} readOnly checked={isItemSelected} />
                                    </div>
                                </td>
                                <td className="cell">
                                    <a className="link" onClick={() => dispatch(replace(`${ROUTES.user_detail}/${data.id}`))}>{data.email}</a>
                                    {data.storename ? <p className="p-0 m-0">{data.storename}</p> : null}
                                </td>
                                <td className="cell">
                                    <a className="link" onClick={() => dispatch(replace(`${ROUTES.user_detail}/${data.id}`))}>{data.name}</a>
                                </td>
                                <td className="cell">{data.access_level}</td>
                                <td className="cell">{data.product}</td>
                                <td className="cell">{data.order}</td>
                                <td className="cell">{data.wishlist}</td>
                                <td className="cell">{moment(Number(data.created)).format('MMM D, YYYY, h:mm A')}</td>
                                <td className="cell">{moment(Number(data.last_login)).format('MMM D, YYYY, h:mm A')}</td>
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

        </div>

    )
}

export default TableUser