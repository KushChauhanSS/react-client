import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  IconButton,
} from '@mui/material';
import { withStyles } from '@mui/styles';

import { styles } from './style';

const GenericTable = ({
  id,
  data,
  columns,
  orderBy,
  order,
  onSort,
  onSelect,
  actions,
  count,
  page,
  rowsPerPage,
  onChangePage,
  classes,
}) => (
  <>
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ borderBottom: '1px solid #e0e0e0' }}>
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
                  key={columnData.field + item.id}
                  align={columnData.align}
                  onClick={() => onSelect(item.id)}
                >
                  {columnData.format
                    ? columnData.format(item[columnData.field])
                    : item[columnData.field]}
                </TableCell>
              ))}
              <TableCell align="center">
                {actions.map((action, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <IconButton key={index} size="small" onClick={() => action.handler(item)}>
                    {action.icon}
                  </IconButton>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
      />
    </TableContainer>
  </>
);

GenericTable.defaultProps = {
  orderBy: '',
  order: 'asc',
  actions: [],
  page: 0,
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
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.element,
    handler: PropTypes.func,
  })),
  count: PropTypes.number.isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default withStyles(styles)(GenericTable);
