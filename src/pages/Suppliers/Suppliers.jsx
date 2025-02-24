import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectGetSuppliers,
  selectSuppliersError,
  selectSuppliersIsLoading,
  selectSuppliersUserName,
} from '../../redux/suppliers/suppliersSelectors';
import { getSuppliersThunk } from '../../redux/suppliers/suppliersServices';
import { setName } from '../../redux/suppliers/suppliersSlice';
import { Container } from 'components/Container/Container';
import { Search } from 'components/Search/Search';
import { TableContainer } from 'components/TableContainer/TableContainer';
import { Table } from 'components/Table/Table';
import titles from 'shared/data/supplierTitles.json';

export const Suppliers = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector(selectGetSuppliers);
  const isLoading = useSelector(selectSuppliersIsLoading);
  const error = useSelector(selectSuppliersError);
  const userName = useSelector(selectSuppliersUserName);
  console.log(suppliers);

  useEffect(() => {
    dispatch(getSuppliersThunk({ userName }));
  }, [userName, dispatch]);

  return (
    <Container>
      <Search placeholder={'User Name'} setName={setName} />
      <TableContainer title="All suppliers">
        {' '}
        {isLoading && !error ? (
          <i>Loading...</i>
        ) : (
          <Table columns={titles.columns} data={suppliers} />
        )}
      </TableContainer>
    </Container>
  );
};
