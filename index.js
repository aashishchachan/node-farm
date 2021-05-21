const http = require('http');
const url = require('url');
const fs = require('fs');

const devdata = fs.readFileSync(`${__dirname}/views/data/data.json`)
const dataObj= JSON.parse(devdata);

const server = http.createServer((req, res)=>{
    console.log("Server Created!");
    const path= req.url;
    res.end('hello form the server!');
});

server.listen('3000', '127.0.0.1', (req, res)=>{
    console.log("Listening 3000");
})

// server.on('\', (req, res)=>{
//     res.end('Hello from the server!')
// })