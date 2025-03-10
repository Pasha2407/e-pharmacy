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

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectGetProducts);
  const isLoading = useSelector(selectProductsIsLoading);
  const error = useSelector(selectProductsError);
  const page = useSelector(selectProductsPage);
  const productName = useSelector(selectProductName);
  const [createdProduct, setCreatedProduct] = useState(false);

  useEffect(() => {
    dispatch(getProductsThunk({ productName, page }));
  }, [productName, page, dispatch]);

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  return (
    <Container>
      <section className={s.management}>
        <Search placeholder={'Product Name'} setName={setName} />
        <AddProductButton setCreatedProduct={setCreatedProduct} />
      </section>
      <TableContainer title="All products">
        {isLoading && !error && <i>Loading...</i>}
        {!createdProduct && <Table columns={titles.columns} data={products} />}
      </TableContainer>
      <Pagination page={page} handlePageChange={handlePageChange} />
    </Container>
  );
};
