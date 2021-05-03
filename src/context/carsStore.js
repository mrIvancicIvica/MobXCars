import { nanoid } from 'nanoid';

export const createCarsStore = () => {
  return {
    carsmake: [],

    addCarMake(brand, model, color) {
      this.carsmake.push({
        id: nanoid(),
        brand,
        model,
        color,
      });
    },
    removeCar(id) {
      this.carsmake = this.carsmake.filter((car) => car.id !== id);
      // const removecar = this.carsmake.filter((car) => car.id !== id)
      // this.carsmake.replace(removecar)
    },
    editCar(id, brand, model, color ) {
      let editCars = [...this.carsmake].map((car) => {
        if (car.id === id) {
          car.brand = brand;
          car.model = model;
          car.color = color;
        } return car
      });
    },
  };
};
