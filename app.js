const fs = require('fs');
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


fs.readdir('./male', (err5, files) => {
    for (const file of files) {
        fs.stat(`./male/${file}`, (err6, stats) => {
            if (stats.isFile()) {
                fs.readFile(`./male/${file}`, (err7, data2) => {
                    const user = JSON.parse(data2)
                    if (user.gender === 'female') {
                        fs.rename(`./male/${file}`, `./female/${file}`, (err8) => {
                            console.log(err8)
                        })
                    }
                })
            }
        })
    }
})