const express = require('express');
require('dotenv').config();
const userRouter = require('./roter/user.router');
const configs = require('./config/config')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);

app.listen(configs.PORT, () => {
    console.log(`Server listen ${configs.PORT}`);
});





