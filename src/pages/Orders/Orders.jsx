import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectGetOrders,
  selectOrdersError,
  selectOrdersIsLoading,
  selectOrdersPage,
  selectOrdersUserName,
} from '../../redux/orders/ordersSelectors';
import { getOrdersThunk } from '../../redux/orders/ordersServices';
import { setPage } from '../../redux/orders/ordersSlice';
import { setName } from '../../redux/orders/ordersSlice';
import { Container } from 'components/Container/Container';
import { Search } from 'components/Search/Search';
import { TableContainer } from 'components/TableContainer/TableContainer';
import { Table } from 'components/Table/Table';
import { Pagination } from 'components/Pagination/Pagination';
import titles from 'shared/data/orderTitles.json';

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectGetOrders);
  const isLoading = useSelector(selectOrdersIsLoading);
  const error = useSelector(selectOrdersError);
  const page = useSelector(selectOrdersPage);
  const userName = useSelector(selectOrdersUserName);

  useEffect(() => {
    dispatch(getOrdersThunk({ userName, page }));
  }, [userName, page, dispatch]);

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  return (
    <Container>
      <Search placeholder={'User Name'} setName={setName} />
      <TableContainer title="All orders">
        {isLoading && !error ? (
          <i>Loading...</i>
        ) : (
          <Table columns={titles.columns} data={orders} />
        )}
      </TableContainer>
      <Pagination page={page} handlePageChange={handlePageChange} />
    </Container>
  );
};
