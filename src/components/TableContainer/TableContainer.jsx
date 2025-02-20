import { clsx } from 'clsx';

import s from './TableContainer.module.scss';

export const TableContainer = ({ size = 'large', title, children }) => {
  return (
    <section
      className={clsx({
        [s.large]: size === 'large',
        [s.small]: size === 'small',
      })}
    >
      <div className={s.title}>
        <h1>{title}</h1>
      </div>
      <div className={s.content}>{children}</div>
    </section>
  );
};
