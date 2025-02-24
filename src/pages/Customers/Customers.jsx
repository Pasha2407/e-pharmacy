import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectGetCustomers,
  selectCustomersError,
  selectCustomersIsLoading,
  selectCustomersPage,
  selectCustomersUserName,
} from '../../redux/customers/customersSelectors';
import { getCustomersThunk } from '../../redux/customers/customersServices';
import { setPage } from '../../redux/customers/customersSlice';
import { setName } from '../../redux/customers/customersSlice';
import { Container } from 'components/Container/Container';
import { Search } from 'components/Search/Search';
import { TableContainer } from 'components/TableContainer/TableContainer';
import { Table } from 'components/Table/Table';
import { Pagination } from 'components/Pagination/Pagination';
import titles from 'shared/data/customerTitles.json';

export const Customers = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectGetCustomers);
  const isLoading = useSelector(selectCustomersIsLoading);
  const error = useSelector(selectCustomersError);
  const page = useSelector(selectCustomersPage);
  const userName = useSelector(selectCustomersUserName);

  useEffect(() => {
    dispatch(getCustomersThunk({ userName, page }));
  }, [userName, page, dispatch]);

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  return (
    <Container>
      <Search placeholder={'User Name'} setName={setName} />
      <TableContainer title="Customers Data">
        {' '}
        {isLoading && !error ? (
          <i>Loading...</i>
        ) : (
          <Table columns={titles.columns} data={customers} />
        )}
      </TableContainer>
      <Pagination page={page} handlePageChange={handlePageChange} />
    </Container>
  );
};
