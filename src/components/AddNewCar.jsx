import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useCarsStore } from '../context/CarsContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  vehicleMake: yup
    .string('Enter vehicle make')
    .required('Required vehicle make'),
  vehicleModel: yup.string('Enter vehicle model').required('Required'),
  vehicleColor: yup.string('Enter color').required('Required'),
});

const AddNewCar = () => {
  const classes = useStyles();
  const carsStore = useCarsStore();

  const formik = useFormik({
    initialValues: { vehicleMake: '' },
    validationSchema: validationSchema,
    onSubmit: ({ vehicleMake, vehicleModel, vehicleColor }) => {
      carsStore.addCarMake(
        `${vehicleMake}`,
        `${vehicleModel}`,
        `${vehicleColor}`
      );
      console.log(`${vehicleMake}`);
      formik.resetForm({
        values: { vehicleMake: '', vehicleModel: '', vehicleColor: '' },
      });
    },
  });

  return (
    <Container maxWidth='md' component='main'>
      <div className={classes.paper}>
        <h2>Add New Car</h2>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id='vehicleMake'
                name='vehicleMake'
                label='Vehicle Make'
                value={formik.values.vehicleMake}
                onChange={formik.handleChange}
                error={
                  formik.touched.vehicleMake &&
                  Boolean(formik.errors.vehicleMake)
                }
                helperText={
                  formik.touched.vehicleMake && formik.errors.vehicleMake
                }
                variant='outlined'
                color='secondary'
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id='vehicleModel'
                name='vehicleModel'
                label='Vehicle Model'
                value={formik.values.vehicleModel}
                onChange={formik.handleChange}
                error={
                  formik.touched.vehicleModel &&
                  Boolean(formik.errors.vehicleModel)
                }
                helperText={
                  formik.touched.vehicleModel && formik.errors.vehicleModel
                }
                variant='outlined'
                color='secondary'
                fullWidth
              />
              <TextField
              className={classes.form}
                id='vehicleColor'
                name='vehicleColor'
                label='Vehicle Color'
                value={formik.values.vehicleColor}
                onChange={formik.handleChange}
                error={
                  formik.touched.vehicleColor &&
                  Boolean(formik.errors.vehicleColor)
                }
                helperText={
                  formik.touched.vehicleColor && formik.errors.vehicleColor
                }
                variant='outlined'
                color='secondary'
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddNewCar;
