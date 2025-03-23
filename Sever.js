const http = require("http");
const fs = require("fs");
const backend=http.createServer((req,res)=>{
    if(req.url ==='/'){
        fs.readFile('day9.html',(err,data)=>{
            if(err){
                res.statusCode=404;
                res.setHeader('Content-type','Text/html');
                res.end("file not found")
            }
            else{
                res.statusCode=200;
                res.setHeader('Content-Type','text/html')
                res.end(data)
            }
        })
    }
});
backend.listen(3000,()=>{
    console.log('success')
})