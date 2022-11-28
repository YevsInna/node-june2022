const Car = require('../db/Car');

module.exports = {
    findByParams: async (filter = {})=>{
        return Car.find(filter);
    },
    // findOneByParams: async (filter = {})=>{
    //    return Car.findOne(filter);
    // },
    // updateOne: async (userId, newInfo)=>{
    //     return Car.findByIdAndUpdate(userId, newInfo, {new: true});  //щоб повертало оновлені дані в Постмені
    // },
    create: async (carInfo)=>{
        return Car.create(carInfo);
    }
    // delete: async (userId)=>{
    //     return Car.deleteOne({_id: userId});
    // }
};