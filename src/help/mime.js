const path = require("path");
const mimes = {
    html    : "text/html",
    rtf     : "application/rtf", 
    gif     : "image/gif", 
    jpeg    : "image/jpeg", 
    jpg     : "image/jpeg", 
    au      : "audio/basic", 
    mpg     : "video/mpeg" ,
    mpeg    : "video/mpeg" ,
    avi     : "video/x-msvideo", 
    tar     : "application/x-tar",
    text    : "text/plain"
}
module.exports= (file)=>{
    let extName = path.extname(file).split(".").pop();
    //没有扩展名，就用简单文本类型
    if(!extName){
        extName = "text";
    }
    let mime = mimes[extName.toLocaleLowerCase()] || "text/plain"
    return mime;
}



