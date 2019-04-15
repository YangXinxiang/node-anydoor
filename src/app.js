const http = require("http");
const config = require("./config/defaultConfig");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req,res)=>{
    const filePath = path.join(config.root,req.url);
    fs.stat(filePath,(error,stats)=>{
        if(error){
            res.statusCode = 404;
            res.setHeader("Content-Type","text/html");
            res.write("<html><body>");
            res.write(`${filePath} is not a directory or file!`);
            res.end("</body></html>");
        }else{
            if(stats.isFile()){
                res.statusCode = 200;
                res.setHeader("Content-Type","text/plain");
                /*
                //下面读文件的代码能工作，但是建议用流的方式
                fs.readFile(filePath,(error,data)=>{
                    if(error){
                        res.end("error");
                    }else{
                        res.write(data);
                        res.end();
                    }
                })*/
               
                //用流的方式，将流输出到res中。
                fs.createReadStream(filePath).pipe(res);                
               
            }else if (stats.isDirectory()){
                fs.readdir(filePath,(error,files)=>{
                    if(error){
                        res.statusCode = 200;
                        res.setHeader("Content-Type","text/plain");
                        res.end("error!!!");
                        return;
                    }else{
                        res.statusCode = 200;
                        res.setHeader("Content-Type","text/plain");
                        res.end(files.join(", "));
                    }
                })
            }
        }

        
    })

});

server.listen(config.port,config.host);