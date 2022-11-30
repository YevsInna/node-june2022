const bcrypt = require('bcrypt');

const ApiError = require("../error/ApiError");

module.exports = {
    hashPassword: (password)=> bcrypt.hash(password, 10),
    comparePassword: async (hashPassword, password)=>{
        const arePasswordsSame = await bcrypt.compare(password,hashPassword);

        if (!arePasswordsSame){
            throw new ApiError('Wrong email or password', 400);
        }
    }
}