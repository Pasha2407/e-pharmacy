import s from './DashboardIvents.module.scss';

export const DashboardIvents = ({ data }) => {
  return (
    <section className={s.ivents}>
      {data.map((item) => (
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
