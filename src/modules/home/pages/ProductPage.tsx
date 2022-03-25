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
import Modal from '../../common/components/Modal/Modal';
import ReactPaginate from 'react-paginate';
import '../css/Pages.css';



const ProductPage = () => {

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalExport, setOpenModalExport] = useState(false)
  const [valueDelete, setValueDelete] = useState({ params: [] })
  const [valueExport, setValueExport] = useState([])
  const [record, setRecord] = useState<any>()
  const [totalPage, setTotalPage] = useState<any>()
  const [valueSearch, setValueSearch] = useState(
    {
      page: 1,
      count: 5,
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

    setRecord(valueSearch.count)
    setTotalPage(json.recordsTotal)
    if (json.success && json.data !== false) {
      setData(json.data.map((data: any) => ({
        id: data.id,
        sku: data.sku,
        name: data.name,
        category: data.category,
        price: data.price,
        in_stock: data.amount,
        vendor: data.vendor,
        arrivalDate: data.arrivalDate,
        enabled: data.enabled,
      })))
    } else {
      setData([])
    }
    setLoading(false)
  }, [valueSearch])

  const confirmRemove = async () => {
    setLoading(true)
    const json = await dispatch(
      fetchThunk(API_PROJECT.productDelete, 'post', valueDelete),
    );
    if (json?.success) {
      setLoading(false)
    }
    setOpenModalDelete(false)
    getData()
  }

  const confirmExport = () => {

  }

  useEffect(() => {
    getData()
  }, [getData])


  return (
    <div className='product-manage'>
      {openModalDelete &&
        <Modal
          title='Confirm Delete'
          content={`Do you want to delete ${valueDelete.params.length > 1 ? 'these products ?' : 'this product ?'}`}
          setOpen={setOpenModalDelete}
          handleConfirm={confirmRemove}
        />}
      {openModalExport &&
        <Modal
          title='Confirm Delete'
          content={`Do you want to export ${valueExport.length == 0 ? 'all products' : valueExport.length > 1 ? 'these products ?' : 'this product ?'}`}
          setOpen={setOpenModalExport}
          handleConfirm={confirmExport}
        />}

      <h2 style={{ fontSize: '2rem', lineHeight: '2.5rem', marginBottom: '16px', fontWeight: '400' }}>Products</h2>
      <ProductFilter
        setValueSearch={setValueSearch}
        valueSearch={valueSearch}
      />
      <button type='button'
        className='btn btn-default mb-4'
        onClick={() => { dispatch(replace(ROUTES.product_create)) }}
      >
        Add Product
      </button>
      <div style={{ overflowX: 'auto' }}>
        <TableProduct datas={data}
          loading={loading}
          setValueDelete={setValueDelete}
          setValueExport={setValueExport}
          setValueSearch={setValueSearch}
          getData={getData}
        />
      </div>

      <div className="pagination">
        <ReactPaginate
          pageCount={Math.ceil(totalPage / record)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          previousLabel={<i className="fa-solid fa-angles-left icon-angles"></i>}
          nextLabel={<i className="fa-solid fa-angles-right icon-angles"></i>}
          onPageChange={(page) => setValueSearch({ ...valueSearch, page: page.selected + 1 })}
        />
        <div className='pagination_tooltip'>
          <span><b>{totalPage}</b> Items</span>
          <select
            className='mx-2'
            defaultValue={valueSearch.count}
            onChange={(e) => {
              setValueSearch({ ...valueSearch, count: +e.target.value })
              setRecord(+e.target.value)
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <span>per page</span>
        </div>
      </div>


      <div className="above-scroller">
        <div style={{ width: '1600px', height: "20px" }}></div>
      </div>
      <div className="sticky-panel">
        {valueDelete.params.length > 0 && <button type="button" onClick={() => setOpenModalDelete(true)} className="btn btn-warning me-2">Remove Select</button>}

        <button type="button" className="btn btn-warning me-2">Save Changes</button>
        <button type="button" className="btn btn-warning" onClick={() => setOpenModalExport(true)}>{valueExport.length > 0 ? 'Export Selected: CSV' : 'Export all: CSV'}</button>
      </div>
    </div>
  )
};

export default ProductPage;
