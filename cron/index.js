const  removeOldToken = require('./removeOldToken');

const cronRunner = ()=>{
    removeOldToken.start()
};

module.exports = {
    cronRunner
};