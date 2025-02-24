import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectGetCustomers,
  selectCustomersError,
  selectCustomersIsLoading,
} from '../../redux/customers/customersSelectors';
import { getCustomersThunk } from '../../redux/customers/customersServices';
import { Container } from 'components/Container/Container';
import { DashboardIvents } from 'components/DashboardIvents/DashboardIvents';
import { TableContainer } from 'components/TableContainer/TableContainer';
import { Table } from 'components/Table/Table';
import titles from 'shared/data/recent-customerTitles.json';
import s from './Dashboard.module.scss';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectGetCustomers);
  const isLoading = useSelector(selectCustomersIsLoading);
  const error = useSelector(selectCustomersError);

  useEffect(() => {
    dispatch(getCustomersThunk({}));
  }, [dispatch]);

  return (
    <Container>
      <DashboardIvents />
      <section className={s.tables}>
        <TableContainer size="small" title="Recent Customers">
          {isLoading && !error ? (
            <i>Loading...</i>
          ) : (
            <Table columns={titles.columns} data={customers} />
          )}
        </TableContainer>
        <TableContainer size="small" title="Income/Expenses">
          List
        </TableContainer>
      </section>
    </Container>
  );
};
