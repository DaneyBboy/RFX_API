const { isUtf8 } = require('buffer')
const fs = require('fs')

// fs.writeFile('demo.txt', "hello world daney",()=>{})

// fs.readFile('demo.txt', (err,data)=>{

//     if(err){
//         return console.log(err)

//     }else {
//         console.log(data.toString())
//     }
// }

// )

// fs.appendFile('demo.txt','\nhello world 123','utf8',(err)=>{
//     if (err) {
//         return console.log(err)
//     }else{
//         console.log('data written')

//     }
// })

fs.unlink('demo.txt',(err)=>{
if (err) {
    return
}
})