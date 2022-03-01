const updateCars = cars => {
    console.log(cars)
    return{
        type: 'UPDATE_CARS',
        payload: cars
    }
}

export default updateCars;