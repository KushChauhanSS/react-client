import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLazyQuery } from '@apollo/client';

import { AddDialog, EditDialog, RemoveDialog } from './components';
import { GenericTable } from '../../components';
import { traineeFormValidationSchema } from '../../validations/validation';
import { SnackBarContext } from '../../contexts/SnackBarProvider/SnackBarProvider';
import { GET_TRAINEES } from './query';

const getFormattedDate = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

// columns data for GenricTable component
const columnsData = [
  {
    field: 'name',
    label: 'Name',
  },
  {
    field: 'email',
    label: 'Email Address',
    format: (value) => value && value.toUpperCase(),
  },
  {
    field: 'createdAt',
    label: 'Date',
    align: 'right',
    format: getFormattedDate,
  },
];

const TraineeList = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    touched: {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    },
    errors: {},
  };

  const initialActionState = {
    originalId: '',
    name: '',
    email: '',
    createdAt: '',
  };

  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenRemoveDialog] = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [actionState, setActionState] = useState(initialActionState);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const [limitSkipValue, setLimitSkipValue] = useState({
    limit: 20,
    skip: 0,
  });
  const [reload, setReload] = useState(false);

  const openSnackBar = useContext(SnackBarContext);

  const history = useHistory();

  const [getTrainees] = useLazyQuery(GET_TRAINEES);

  const validateFormData = async (value, type) => {
    try {
      await traineeFormValidationSchema.validate({
        ...formValue, [type]: value,
      }, {
        abortEarly: false,
      });
      setFormValue({
        ...formValue,
        [type]: value,
        touched: { ...formValue.touched, [type]: true },
        errors: {},
      });
    } catch (err) {
      const formErrors = {};
      if (err) {
        err.inner.forEach((errorItem) => {
          formErrors[errorItem.path] = errorItem.message;
        });
      }
      setFormValue({
        ...formValue,
        [type]: value,
        touched: { ...formValue.touched, [type]: true },
        errors: formErrors,
      });
    }
  };

  // AddDialog handlers

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValue(initialState);
  };

  const handleSubmit = () => {
    setReload((prev) => !prev);
    console.log({ name: formValue.name, email: formValue.email, password: formValue.password });
  };

  const handleChange = (event) => {
    const { value, name: type } = event.target;
    validateFormData(value, type);
  };

  const handleBlur = (event) => {
    const { value, name: type } = event.target;
    validateFormData(value, type);
  };

  // EditDialog handlers

  const handleEditDialogOpen = (data) => {
    setActionState({
      ...actionState, originalId: data.originalId, name: data.name, email: data.email,
    });
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setFormValue(initialState);
  };

  const handleEditDialogSubmit = () => {
    setReload((prev) => !prev);
    console.log('Edited Item', { name: actionState.name, email: actionState.email });
  };

  const handleEditDialogChange = (event) => {
    const { value, name: type } = event.target;
    setActionState({ ...actionState, [type]: value });
  };

  // RemoveDialog handlers

  const handleRemoveDialogOpen = (data) => {
    setActionState({
      ...actionState,
      originalId: data.originalId,
      name: data.name,
      email: data.email,
      createdAt: data.createdAt,
    });
    setOpenRemoveDialog(true);
  };

  const handleRemoveDialogClose = () => {
    setOpenRemoveDialog(false);
  };

  const handleDelete = () => {
    setReload((prev) => !prev);
    console.log('Deleted Item', actionState);
  };

  // Sorting handler
  const handleSort = (field) => {
    if (orderBy === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setOrderBy(field);
      setOrder('asc');
    }
  };

  // Select table row handler
  const handleSelect = (id) => {
    // navigating to the specific route
    history.push({
      pathname: `/trainee/${id}`,
      state: {
        response: tableData,
      },
    });
  };

  // Page change handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLimitSkipValue({ ...limitSkipValue, skip: newPage * limitSkipValue.limit });
  };

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await getTrainees(
        { variables: { limit: limitSkipValue.limit, skip: limitSkipValue.skip } },
      );
      const { data: { getAllTrainees: { result: { documents, userData } } } } = response;
      setLoading(false);
      setDataLength(userData.length);
      setCount(documents);
      setTableData(userData);
    } catch (error) {
      setLoading(false);
      openSnackBar(error.message, 'error');
    }
  }, [limitSkipValue, reload]);

  return (
    <>
      <AddDialog
        open={open}
        onClick={handleClickOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onBlur={handleBlur}
        data={formValue}
      />
      <GenericTable
        id="61598424fbfdfec65e2dd36b"
        data={tableData}
        columns={columnsData}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
        onSelect={handleSelect}
        actions={[
          {
            icon: <EditIcon fontSize="inherit" />,
            handler: handleEditDialogOpen,
          },
          {
            icon: <DeleteIcon fontSize="inherit" />,
            handler: handleRemoveDialogOpen,
          },
        ]}
        count={count}
        page={page}
        rowsPerPage={limitSkipValue.limit}
        onChangePage={handleChangePage}
        loading={loading}
        dataLength={dataLength}
      />
      <EditDialog
        open={openEditDialog}
        value={
          { originalId: actionState.originalId, name: actionState.name, email: actionState.email }
        }
        onChange={handleEditDialogChange}
        onClose={handleEditDialogClose}
        onSubmit={handleEditDialogSubmit}
      />
      <RemoveDialog
        open={openDeleteDialog}
        onClose={handleRemoveDialogClose}
        onDelete={handleDelete}
        actionState={actionState}
        page={page}
        dataLength={dataLength}
        handlePageNavigation={handleChangePage}
      />
    </>
  );
};

export default TraineeList;
