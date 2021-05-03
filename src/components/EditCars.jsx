import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useCarsStore } from '../context/CarsContext';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

 function EditCars({ editCar, setOpenDialog }) {
  const [values, setValues] = useState({ brand: '', model: '', color: '' });
  const carStore = useCarsStore();
  const [editsCars, setEditsCars] = useState(carStore.carsmake);
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const editCars = (data) => {
    let editedCar = editsCars.findIndex((car) => car.id === data.id);
    setEditsCars[editedCar] = { ...data };
  };

  // const editedCar = (id, brand) => {
  //     let editCars = editsCars.map((car) => {
  //       if (car.id === id) {
  //         car.vehicleMake = brand;
  //       }
  //       return car;
  //     });
  //     setEditsCars(editCars);
  //   };

  const editedCar = (id, text) => {
    let editCar = editsCars.map((car) => {
      if (car.id === id) {
        car.model = text;
      } 
      return car;
    });
    setEditsCars(editCar);
  };






  const handleSubmiting = (e) => {
    e.preventDefault();
    setOpenDialog(false);
    editedCar(editCar.id, editCar.model);
  };

  useEffect(() => {
    if (editCar !== null) {
      setValues({ ...editCar });
    }
  }, [editCar]);

  return   (
    <form
      className={classes.root}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmiting}
    >
      <TextField
        id='brand'
        name='brand'
        value={values.brand}
        label='Brand'
        onChange={handleInputChange}
        variant='outlined'
      />
      <TextField
        id='model'
        name='model'
        value={values.model}
        label='Model'
        onChange={handleInputChange}
        variant='outlined'
      />
      <TextField
        id='color'
        name='color'
        value={values.color}
        label='Color'
        onChange={handleInputChange}
        variant='outlined'
      />
      <Button variant='contained' color='primary' type='submit'>
        Save Changes
      </Button>
    </form>
  );
}


export default EditCars