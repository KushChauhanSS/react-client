import React, { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { AddDialog } from './components';
import { GenericTable } from '../../components';
import { traineeFormValidationSchema } from '../../validations/validation';
import trainees from './data/trainee';

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
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValue(initialState);
  };

  const handleSubmit = () => {
    console.log({ name: formValue.name, email: formValue.email, password: formValue.password });
  };

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

  const handleChange = (event) => {
    const { value, name: type } = event.target;
    validateFormData(value, type);
  };

  const handleBlur = (event) => {
    const { value, name: type } = event.target;
    validateFormData(value, type);
  };

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setOrderBy(field);
      setOrder('asc');
    }
  };

  const handleSelect = (id) => {
    // navigating to the specific route
    history.push(`/trainee/${id}`);
  };

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
        data={trainees}
        columns={columnsData}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
        onSelect={handleSelect}
      />
    </>
  );
};

export default TraineeList;
