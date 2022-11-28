const {carService} = require ('../services')

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const cars = await carService.findByParams();
            res.json(cars);
        } catch (e) {
            next(e)
        }
    },

    create: async (req, res, next) => {
        try {
            const carInfo = req.body;
            const car = await carService.create(carInfo);

            res.status(201).json(car);
        } catch (e) {
            next(e);
        }
    }

    // getById: async (req, res, next) => {
    //     try {
    //         res.json(req.car);
    //     } catch (e) {
    //         next(e)
    //     }
    // },

    // update: async (req, res, next) => {
    //     try {
    //         const newCarInfo = req.body;
    //         const carId = req.params.carId;
    //
    //         const newCar = await carService.updateOne(carId, newCarInfo);
    //
    //         res.status(201).json(newCar)
    //
    //     } catch (e) {
    //         next(e)
    //     }
    // },

//     delete: async (req, res, next) => {
//         try {
//             await carService.delete(req.params.carId)
//
//             res.sendStatus(204)
//         } catch (e) {
//             next(e)
//         }
//     }
};