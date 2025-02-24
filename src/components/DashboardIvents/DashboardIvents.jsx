import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGetTotalProducts } from '../../redux/products/productsSelectors';
import { getProductsThunk } from '../../redux/products/productsServices';
import s from './DashboardIvents.module.scss';

export const DashboardIvents = () => {
  const dispatch = useDispatch();
  const totalProducts = useSelector(selectGetTotalProducts);

  const data = [
    { id: '1', title: 'All orders', count: '25' },
    { id: '2', title: 'All products', count: totalProducts },
    { id: '3', title: 'All suppliers', count: '5' },
    { id: '4', title: 'All Customers', count: '88' },
  ];

  useEffect(() => {
    dispatch(getProductsThunk({}));
  }, [dispatch]);

  return (
    <section className={s.ivents}>
      {data.map(item => (
        <div key={item.id} className={s.ivent}>
          <div className={s.title}>
            <div className={s.logo}></div>
            <p>{item.title}</p>
          </div>
          <p className={s.count}>{item.count}</p>
        </div>
      ))}
    </section>
  );
};
