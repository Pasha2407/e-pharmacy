import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectGetProducts,
  selectProductsError,
  selectProductsIsLoading,
  selectProductsPage,
  selectProductName,
} from '../../redux/products/productsSelectors';
import { getProductsThunk } from '../../redux/products/productsServices';
import { setPage } from '../../redux/products/productsSlice';
import { setName } from '../../redux/products/productsSlice';
import { Container } from 'components/Container/Container';
import { Search } from 'components/Search/Search';
import { AddProductButton } from 'components/AddProductButton/AddProductButton';
import { TableContainer } from 'components/TableContainer/TableContainer';
import { Table } from 'components/Table/Table';
import { Pagination } from 'components/Pagination/Pagination';
import titles from 'shared/data/productTitles.json';
import s from './Products.module.scss';
import { Modal } from 'components/Modal/Modal';

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectGetProducts);
  const isLoading = useSelector(selectProductsIsLoading);
  const error = useSelector(selectProductsError);
  const page = useSelector(selectProductsPage);
  const productName = useSelector(selectProductName);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productId, setProductId] = useState('');

  useEffect(() => {
    dispatch(getProductsThunk({ productName, page }));
  }, [productName, page, dispatch, showEditModal]);

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  const openEditModal = id => {
    setProductId(id);
    setShowEditModal(true);
  };

  return (
    <Container>
      <section className={s.management}>
        <Search placeholder={'Product Name'} setName={setName} />
        <AddProductButton />
      </section>
      <TableContainer title="All products">
        {isLoading && !error && <i>Loading...</i>}
        <Table
          columns={titles.columns}
          data={products}
          action={true}
          openEditModal={openEditModal}
        />
      </TableContainer>
      <Pagination page={page} handlePageChange={handlePageChange} />
      {showEditModal && (
        <Modal setShowModal={setShowEditModal} add={false} id={productId} />
      )}
    </Container>
  );
};
