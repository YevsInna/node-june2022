const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('Server listen 5000');
});

app.get('/users', async (req, res) => {
    const users = await reader();
    res.json(users)
});

app.post('/users', async (req, res) => {
    const userInfo = req.body;

    const users = await reader();

    const newUser = {...userInfo, id: users[users.length - 1].id + 1};

    users.push(newUser);

    await writer(users);

    res.status(201).json(newUser);
});

app.get('/users/:userId', async (req, res) => {

    const {userId} = req.params;

    const users = await reader();

    const user = users.find((u) => u.id === +userId);

    if (!user) {
        return res.status(404).json(`User with id ${userId} is not found`)
    };

    res.json(user);
});

app.put('/users/:userId', async (req, res) => {
    const newUserInfo = req.body;
    const {userId} = req.params;

    const users = await reader();

    const index = users.findIndex((u) => u.id === +userId);

    if (index === -1) {
        return res.status(404).json(`User with id ${userId} is not found`)
    };

    users[index] = {...users[index], ...newUserInfo};

    await writer(users);

    res.status(201).json(users[index])
});

app.delete('/users/:userId', async (req, res) => {

    const {userId} = req.params;

    const users = await reader();

    const index = users.findIndex((u) => u.id === +userId);

    if (index === -1) {
        return res.status(404).json(`User with id ${userId} is not found`)
    };

    users.splice(index, 1);

    await  writer(users);

    res.sendStatus(204)
});

const reader = async () => {
    const buffer = await fs.readFile(path.join(__dirname, 'db', 'users.json'));
    return JSON.parse(buffer.toString());
};

const writer = async (users) => {
    await fs.writeFile(path.join(__dirname, 'db', 'users.json'), JSON.stringify(users));
}


