const fs = require('fs/promises');

const path = require('path');

//
// fs.mkdir('./female', (err)=>{
//     console.log(err)
// });
//
// fs.mkdir('./male', (err)=>{
//     console.log(err)
// });


// fs.readdir('./female', (err, files) => {
//     for (const file of files) {
//         fs.stat(`./female/${file}`, (err2, stats) => {
//             if (stats.isFile()) {
//                 fs.readFile(`./female/${file}`, (err3, data) => {
//                     const user = JSON.parse(data)
//                     if (user.gender === 'male') {
//                         fs.rename(`./female/${file}`, `./male/${file}`, (err4) => {
//                             console.log(err4)
//                         })
//                     }
//                 })
//             }
//         })
//     }
// })


// fs.readdir('./male', (err5, files) => {
//     for (const file of files) {
//         fs.stat(`./male/${file}`, (err6, stats) => {
//             if (stats.isFile()) {
//                 fs.readFile(`./male/${file}`, (err7, data2) => {
//                     const user = JSON.parse(data2)
//                     if (user.gender === 'female') {
//                         fs.rename(`./male/${file}`, `./female/${file}`, (err8) => {
//                             console.log(err8)
//                         })
//                     }
//                 })
//             }
//         })
//     }
// })

const sorter = async (readFolder, writeFolder, gender) => {

    try {
        const folderPath = path.join(__dirname, readFolder);

        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const data = await fs.readFile(filePath);
            const user = JSON.parse(data);

            if (user.gender === gender){
                await fs.rename(filePath, path.join(__dirname, writeFolder, file));
            }
        }
    }catch (e){
        console.error(e)
    }

}

sorter('female','male', 'male');
sorter('male','female', 'female');