const updateCars = cars => {
    return{
        type: 'UPDATE_CARS',
        payload: cars
    }
}

export default updateCars;