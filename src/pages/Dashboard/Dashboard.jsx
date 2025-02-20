import { Container } from 'components/Container/Container';
import { DashboardIvents } from 'components/DashboardIvents/DashboardIvents';
import { TableContainer } from 'components/TableContainer/TableContainer';
import s from './Dashboard.module.scss';

const dataIvent = [
  { id: '1', title: 'All products', count: '8,430' },
  { id: '2', title: 'All suppliers', count: '211' },
  { id: '3', title: 'All Customers', count: '140' },
];

export const Dashboard = () => {
  return (
    <Container>
      <DashboardIvents data={dataIvent} />
      <section className={s.tables}>
        <TableContainer size="small" title="Recent Customers">
          Table
        </TableContainer>
        <TableContainer size="small" title="Income/Expenses">
          List
        </TableContainer>
      </section>
    </Container>
  );
};
