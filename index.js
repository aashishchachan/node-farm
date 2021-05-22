const http = require('http');
const url = require('url');
const fs = require('fs');

const devdata = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj= JSON.parse(devdata);

const home = fs.readFileSync(`${__dirname}/views/overview-template.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/views/product-template.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/views/card-template.html`, 'utf-8');

const replaceT = (temp, product)=>{
    let out = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    out = out.replace(/{%PRICE%}/g, product.price);
    out = out.replace(/{%NUTRIENTS%}/g, product.nutrients);
    out = out.replace(/{%QUANTITY%}/g, product.quantity);
    out = out.replace(/{%IMAGE%}/g, product.image);
    out = out.replace(/{%FROM%}/g, product.from);
    out = out.replace(/{%DESCRIPTION%}/g, product.description);
    out = out.replace(/{%ID%}/g, product.id);
    
    if(!product.organic) out = out.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return out;
}

const server = http.createServer((req, res)=>{
    
    let tempUrl=req.url;
    params = new URLSearchParams(tempUrl)
    const id =params.get('/product?id');
    if(id !=null) tempUrl = '/product';
    const path = tempUrl
    
    //home
    if(path==='/' || path==='/overview'){
        const cardHTML= dataObj.map(el => replaceT(card, el)).join('');
        const out = home.replace("{%PRODUCT_CARDS%}", cardHTML);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(out);
    }

    //PRODUCT
    else if(path==='/product'){
        const pr = dataObj[id]
        const out = replaceT(product, pr)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(out);
    }

    //API
    else if(path === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(devdata);  
    }

    //not found
    else {
        res.writeHead(404, {'Content-type': 'application/json'});
        res.end("Page not found");
    }
});

server.listen('3000', '127.0.0.1', (req, res)=>{
    console.log("Listening 3000");
})

// server.on('\', (req, res)=>{
//     res.end('Hello from the server!')
// })