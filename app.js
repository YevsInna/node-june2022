const fs = require('fs');
//
// fs.mkdir('./female', (err)=>{
//     console.log(err)
// });
//
// fs.mkdir('./male', (err)=>{
//     console.log(err)
// });



fs.readdir('./female', (err, files)=>{
    for (const file of files) {
        fs.stat(`./female/${file}`, (err2, stats)=>{
            if (stats.isFile()){
                fs.readFile(`./female/${file}`, (err3, data)=>{

                   if (data.filter(value => value.gender === 'male')){
                       fs.rename(`./female/${file}`, `./male/${file}`, (err4)=>{
                           console.log(err4)
                       })
                   }
                })
            }
        })
    }
})