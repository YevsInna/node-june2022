const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const configs = require('./config/config')
const {carRouter, userRouter} = require("./roter");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/cars', carRouter);

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.MONGO_URL)
     console.log(`Server listen ${configs.PORT}`);
});






