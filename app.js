const express = require('express');
const usersDB = require('./db/users')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('Server listen 5000');
});

app.get('/users', (req, res) => {
    console.log('USERS ENDPOINT')
    // res.json({user: 'Inna'})
    // res.status(402).json('402 error')
    res.json(usersDB)
});

app.get('/users/:userId', (req, res) => {
    console.log('ONE USER ENDPOINT')
    const {userId} = req.params;
    res.json(usersDB[userId])
});

app.post('/users', (req, res) => {
    const userInfo = req.body
    usersDB.push(userInfo)
    console.log(userInfo);
    // res.status(201).json('created');
})