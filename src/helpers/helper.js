export const hasErrors = (data) => {
  const fields = Object.keys(data);
  const errors = fields.map((field) => data[field].hasErrors);
  return errors.includes(true);
};

export const isTouched = (data) => {
  const fields = Object.keys(data);
  const touched = fields.filter((field) => data[field].isTouched === true);
  if (touched.length === 3) {
    return true;
  }
  return false;
};

export const getError = (field) => `${field} is a required field`;
