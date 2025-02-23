import s from './Pagination.module.scss';

export const Pagination = ({ page, handlePageChange }) => {
  return (
    <section className={s.pagination}>
      <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={() => handlePageChange(page + 1)}>Next</button>
    </section>
  );
};
