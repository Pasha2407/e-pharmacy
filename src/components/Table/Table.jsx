import s from './Table.module.scss';

export const Table = ({
  columns,
  data,
  action = false,
  openEditModal,
  openDeleteModal,
}) => {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row, index) => (
          <tr key={index}>
            {columns.map(col => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
            {action && (
              <td className={s.action}>
                <div onClick={() => openEditModal(row.id)}></div>
                <div onClick={() => openDeleteModal(row.id)}></div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
