import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectGetIncomeExpenses,
  selectIncomeExpensesError,
  selectIncomeExpensesIsLoading,
} from '../../redux/incomeExpenses/incomeExpensesSelectors';
import { getIncomeExpensesThunk } from '../../redux/incomeExpenses/incomeExpensesServices';
import s from './List.module.scss';

export const List = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectGetIncomeExpenses);
  const isLoading = useSelector(selectIncomeExpensesIsLoading);
  const error = useSelector(selectIncomeExpensesError);

  useEffect(() => {
    dispatch(getIncomeExpensesThunk({}));
  }, [dispatch]);

  return isLoading && !error ? (
    <i>Loading...</i>
  ) : (
    <div className={s.list}>
      <div className={s.title}>Today</div>
      <div className={s.content}>
        {data?.map(item => (
          <div key={item._id} className={s.row}>
            <div>{item.type}</div>
            <p>{item.name}</p>
            <span>{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
