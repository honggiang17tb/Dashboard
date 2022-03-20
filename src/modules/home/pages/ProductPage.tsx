import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import ProductFilter from '../components/Product/ProductFilter'
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PROJECT } from '../../../configs/api';
import TableProduct from '../components/Product/TableProduct';
import '../css/Pages.css';



const ProductPage = () => {

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [valueSearch, setValueSearch] = useState(
    {
      page: 1,
      count: 10,
      search: "",
      category: "0",
      stock_status: "all",
      availability: "all",
      vendor: "",
      sort: "name",
      order_by: "ASC",
      search_type: ""
    })

  const getData = useCallback(async () => {
    setLoading(true)
    const json = await dispatch(
      fetchThunk(API_PROJECT.productList, 'post', valueSearch),
    );
    if (json.success) {
      setData(json.data.slice(0, 10).map((data: any) => ({
        id: data.id,
        sku: data.sku,
        name: data.name,
        category: data.category,
        price: data.price,
        in_stock: data.amount,
        vendor: data.vendor,
        arrivalDate: data.arrivalDate,
      })))
      setLoading(false)
    }
  }, [])


  useEffect(() => {
    getData()
  }, [])


  return (
    <div className='product-manage'>
      <h2 style={{ fontSize: '2rem', lineHeight: '2.5rem', marginBottom: '16px', fontWeight: '400' }}>Products</h2>
      <ProductFilter />
      <button type='button'
        className='btn btn-default mb-4'
        onClick={() => { dispatch(replace(ROUTES.product_create)) }}
      >
        Add Product
      </button>
      <div style={{ overflowX: 'auto' }}>
        <TableProduct datas={data} loading={loading} />
      </div>
      <div className="above-scroller">
        <div style={{ width: '1600px', height: "20px" }}></div>
      </div>
      <div className="sticky-panel">
        <button type="button" className="btn btn-warning me-2">Save Changes</button>
        <button type="button" className="btn btn-warning">Export all: CSV</button>
      </div>
    </div>
  )
};

export default ProductPage;
