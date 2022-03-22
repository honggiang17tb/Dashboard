import React, { useEffect, useState } from "react";
import { ROUTES } from "../../../../configs/routes";
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router';
import moment from 'moment'
import Loading from "../../../common/components/Loading/Loading";


interface Props {
    id: string,
    sku: string,
    name: string,
    category: string,
    price: string,
    in_stock: string,
    vendor: string,
    arrivalDate: string,
}
interface DataProps {
    datas: Array<Props> | undefined
    loading: boolean
    setValueDelete: React.Dispatch<React.SetStateAction<any>>
    setValueExport: React.Dispatch<React.SetStateAction<any>>
}
const TableProduct = (props: DataProps) => {
    const { datas, loading, setValueDelete, setValueExport } = props
    const dispatch = useDispatch()
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [selectDelete, setSelectDelete] = React.useState<readonly string[]>([]);


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = datas?.map((data) => data.id);
            newSelecteds && setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

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

    useEffect(() => {
        setValueDelete({
            params: selectDelete.map((item) => {
                return { id: item, delete: 1 }
            })
        })
    }, [selectDelete])

    useEffect(() => {
        setValueExport(selected)
    }, [selected])


    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th scope="col"><input type='checkbox' onChange={handleSelectAllClick}></input></th>
                    <th scope="col">SKU</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">In stock</th>
                    <th scope="col">Vendor</th>
                    <th scope="col">Arrival Date</th>
                </tr>
            </thead>
            <tbody className="lines">
                {loading ? <Loading /> : datas?.slice(0, 10).map((data) => {
                    const isItemSelected = isSelected(data.id);
                    const toDelete = willDelete(data.id);
                    return (
                        <tr key={data.id} className={toDelete}>
                            <td className="cell actions">
                                <div className="left">
                                    <div className="pe-2">
                                        <input type='checkbox' onClick={(event) => handleSelect(event, data.id, false)} readOnly checked={isItemSelected} />
                                    </div>
                                    <div className="action-update">
                                        <i className="fa fa-power-off"></i>
                                    </div>
                                </div>
                            </td>
                            <td className="cell">{data.sku}</td>
                            <td className="cell">
                                <a className="link" onClick={() => dispatch(replace(`${ROUTES.product_detail}/${data.id}`))}>{data.name}</a>
                            </td>
                            <td className="cell">{data.category}</td>
                            <td className="cell">{`$${Number(data.price).toFixed(2)}`}</td>
                            <td className="cell">{data.in_stock}</td>
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
    )
}

export default TableProduct