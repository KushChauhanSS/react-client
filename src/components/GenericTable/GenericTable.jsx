import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';

const GenricTable = ({ id, data, columns }) => (
  <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns.map((columnData) => (
            <TableCell variant="footer" align={columnData.align}>{columnData.label ? columnData.label : columnData.field}</TableCell>
          ))}
          {/* <TableCell variant="footer" align="center">Name</TableCell>
            <TableCell variant="footer" align="left">Email Address</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.id + id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {columns.map((columnData) => (
              <TableCell align={columnData.align} sx={{ fontSize: '1rem' }}>{item[columnData.field]}</TableCell>
            ))}
            {/* <TableCell align="center" sx={{ fontSize: '1rem' }}>{item.name}</TableCell>
              <TableCell align="left" sx={{ fontSize: '1rem' }}>{item.email}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

GenricTable.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
  })).isRequired,
  columns: PropTypes.string.isRequired,
};

export default GenricTable;
