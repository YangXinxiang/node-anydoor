const fs = require("fs");
const promisify = require("util").promisify;
const read  = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
module.exports = async function(req,res,filePath){
    //const data = await read(filePath);
    try{
        const stats = await stat(filePath);
        if(stats.isFile()){
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");        
            fs.createReadStream(filePath).pipe(res);    
        }else if (stats.isDirectory()){            
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end(files.join(", "));            
        }

    }catch(e){
        res.statusCode = 404;
        res.setHeader("Content-Type","text/html");
        res.write("<html><body>");
        res.write(`${filePath} is not a directory or file!`);
        res.end("</body></html>");
    }    
}

