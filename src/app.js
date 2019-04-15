const http = require("http");
const config = require("./config/defaultConfig");
const path = require("path");
const route = require("./help/route");
const server = http.createServer((req,res)=>{
    const filePath = path.join(config.root,req.url);
    route(req,res,filePath,req.url);
});

server.listen(config.port,config.host);