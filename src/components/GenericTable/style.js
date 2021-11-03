export const styles = {
  tableContainer: {
    marginTop: '1rem',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  tableSortLabel: {
    '&:hover': { color: '#262626', cursor: 'pointer' },
  },
  tableBodyRow: {
    '&:last-child td, &:last-child th': { border: 0 },
    '&:nth-child(odd)': { backgroundColor: '#f5f5f5' },
    '&:hover': { backgroundColor: '#dfdfdf', cursor: 'pointer' },
  },
  tableBodyRowCell: {
    fontSize: '1rem',
  },
};
