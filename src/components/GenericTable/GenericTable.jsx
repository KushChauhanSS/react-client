import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel,
} from '@mui/material';
import { withStyles } from '@mui/styles';

import { styles } from './style';

const GenericTable = ({
  id, data, columns, orderBy, order, onSort, onSelect, classes,
}) => (
  <TableContainer className={classes.tableContainer} component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns.map((columnData) => (
            <TableCell key={columnData.field + id} variant="footer" align={columnData.align}>
              <TableSortLabel
                className={classes.tableSortLabel}
                active={orderBy === columnData.field}
                direction={order}
                hideSortIcon
                onClick={() => onSort(columnData.field)}
              >
                {columnData.label ? columnData.label : columnData.field}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow
            className={classes.tableBodyRow}
            key={item.id + id}
          >
            {columns.map((columnData) => (
              <TableCell
                className={classes.tableBodyRowCell}
                align={columnData.align}
                onClick={() => onSelect(item.id)}
              >
                {columnData.format
                  ? columnData.format(item[columnData.field])
                  : item[columnData.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

GenericTable.defaultProps = {
  orderBy: '',
  order: 'asc',
};

GenericTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
  })).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    label: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right', 'center']),
    format: PropTypes.func,
  })).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(GenericTable);
