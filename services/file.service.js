const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(process.cwd(), 'db', 'users.json');

module.exports = {
    writer: async (users) => {
        await fs.writeFile(filePath, JSON.stringify(users));
    },
    reader: async () => {
        const buffer = await fs.readFile(filePath);
        return JSON.parse(buffer.toString());
    },
};