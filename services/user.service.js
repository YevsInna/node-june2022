const User = require('../db/User');

module.exports = {
    findByParams: async (filter = {})=>{
        return User.find(filter);
    },
    findOneByParams: async (filter = {})=>{
       return User.findOne(filter);
    },
    updateOne: async (userId, newInfo)=>{
        return User.findByIdAndUpdate(userId, newInfo, {new: true});  //щоб повертало оновлені дані в Постмені
    },
    create: async (userInfo)=>{
        return User.create(userInfo);
    },
    delete: async (userId)=>{
        return User.deleteOne({_id: userId});
    }
};