import React, { useEffect, useState } from 'react';
import EditCar from './EditCars'
import {
  Paper,
  Table,
  makeStyles,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  Container,
  TextField,
  InputAdornment,
  Button,
  Dialog
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import Search from '@material-ui/icons/Search';

import { useObserver } from 'mobx-react-lite';
import { useCarsStore } from '../context/CarsContext';

const useStyles = makeStyles({
  table: {
    marginTop: 50,
  },
  header: {
    flexGrow: 1,
  },
});

const data = [
  { id: 1, brand: 'audi', model: 'a6' },
  { id: 2, brand: 'bmw', model: '318' },
  { id: 3, brand: 'mercedes', model: 'c220' },
  { id: 4, brand: 'mazda', model: '6' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const ListOfCars = () => {
  const carStore = useCarsStore();
  const classes = useStyles();
  const [valueToOrderBy, setValueToOrderBy] = useState('name');
  const [orederDirection, setOrederDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [filterCars, setFilterCars] = useState(carStore.carsmake);
  const [editCar, setEditCar] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    setFilterCars(
      carStore.carsmake.filter((car) =>
        car.brand.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAscending =
      valueToOrderBy === property && orederDirection === 'asc';
    setValueToOrderBy(property);
    setOrederDirection(isAscending ? 'desc' : 'asc');
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const deleteCar = (id) => {
    carStore.removeCar(id);
    setFilterCars(carStore.carsmake);
  };


  const handleEditCar=(car)=> {
    setEditCar(car)
    setOpenDialog(true)
  }

  const handleClose =()=>{
    setOpenDialog(false)
  }

  return useObserver(() => (
    <Container>
      <h1>List of Cars</h1>
      <TextField
        className={classes.margin}
        placeholder='Search car...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Container component={Paper} className={classes.table}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell key='brand'>
                <TableSortLabel
                  active={valueToOrderBy === 'brand'}
                  direction={
                    valueToOrderBy === 'brand' ? orederDirection : 'asc'
                  }
                  onClick={createSortHandler('brand')}
                >
                  Manufacturer
                </TableSortLabel>
              </TableCell>

              <TableCell align='right' key='model'>
                <TableSortLabel
                  active={valueToOrderBy === 'model'}
                  direction={
                    valueToOrderBy === 'model' ? orederDirection : 'asc'
                  }
                  onClick={createSortHandler('model')}
                >
                  Model
                </TableSortLabel>
              </TableCell>

              <TableCell align='right' key='color'>
                <TableSortLabel
                  active={valueToOrderBy === 'color'}
                  direction={
                    valueToOrderBy === 'color' ? orederDirection : 'asc'
                  }
                  onClick={createSortHandler('color')}
                >
                  Color
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(
              filterCars,
              getComparator(orederDirection, valueToOrderBy)
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((car) => (
                <TableRow key={car.id}>
                  <TableCell component='th' scope='row'>
                    {car.brand}
                  </TableCell>

                  <TableCell align='right'>{car.model}</TableCell>

                  <TableCell align='right'>{car.color}</TableCell>
                  <TableCell align='right'>
                    <Button onClick={()=> {handleEditCar(car)}}>
                      <Edit fontSize='small' />
                    </Button>
                    <Button onClick={() => deleteCar(car.id)}>
                      <Delete fontSize='small' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={carStore.carsmake.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Container>
      <Dialog open={openDialog} onClose={handleClose}>
        <EditCar editCar={editCar} setOpenDialog={setOpenDialog} />
      </Dialog>
    </Container>
  ));
};

export default ListOfCars;
