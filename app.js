const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./roter/user.router');
const configs = require('./config/config')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.MONGO_URL)
    console.log(`Server listen ${configs.PORT}`);
});





