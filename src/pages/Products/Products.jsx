import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectGetProducts,
  selectProductsError,
  selectProductsIsLoading,
  selectProductsPage,
  selectProductName,
} from '../../redux/products/productsSelectors';
import { selectAuthenticated } from '../../redux/auth/authSelectors';
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
import { DeleteModal } from 'components/DeleteModal/DeleteModal';

export const Products = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const products = useSelector(selectGetProducts);
  const isLoading = useSelector(selectProductsIsLoading);
  const error = useSelector(selectProductsError);
  const page = useSelector(selectProductsPage);
  const productName = useSelector(selectProductName);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productId, setProductId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState('');
  const action = authenticated ? true : false;

  useEffect(() => {
    dispatch(getProductsThunk({ productName, page }));
  }, [productName, page, dispatch, showEditModal, showDeleteModal]);

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  const openEditModal = id => {
    setProductId(id);
    setShowEditModal(true);
  };

  const openDeleteModal = id => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  return (
    <Container>
      <section className={s.management}>
        <Search placeholder={'Product Name'} setName={setName} />
        {authenticated && <AddProductButton />}
      </section>
      <TableContainer title="All products">
        {isLoading && !error && <i>Loading...</i>}
        <Table
          columns={titles.columns}
          data={products}
          action={action}
          openEditModal={openEditModal}
          openDeleteModal={openDeleteModal}
        />
      </TableContainer>
      <Pagination page={page} handlePageChange={handlePageChange} />
      {showEditModal && (
        <Modal setShowModal={setShowEditModal} add={false} id={productId} />
      )}
      {showDeleteModal && (
        <DeleteModal setShowModal={setShowDeleteModal} id={deleteProductId} />
      )}
    </Container>
  );
};
