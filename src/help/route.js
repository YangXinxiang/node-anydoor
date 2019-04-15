const fs = require("fs");
const promisify = require("util").promisify;
const path = require("path");
const handlebars = require("handlebars");
//const config = require("../config/defaultConfig");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const tplPath = path.join(__dirname,"../template/dir.tpl");
const source = fs.readFileSync(tplPath);
const template = handlebars.compile(source.toString());

module.exports = async function(req,res,filePath,reqUrl){
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
            res.setHeader("Content-Type","text/html");
            //let dir =  path.relative(config.root,filePath);
            var newDir = reqUrl;
            if(reqUrl=="/"){
                newDir = "";
            }
            
            //res.end(files.join(", "));  
            const data = {
                dir :newDir ,
                //title:path.basename(filePath),
                files
            }
            
            const rst = template(data);
            res.end(rst);
        }

    }catch(e){
        res.statusCode = 404;
        res.setHeader("Content-Type","text/html");
        res.write("<html><body>");
        res.write(`${filePath} is not a directory or file!`);
        res.end("</body></html>");
    }    
}

