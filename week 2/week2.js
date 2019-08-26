let http = require('http'); 
let fs = require('fs');
let urlParse = require('url'); //url provides utilities for URL resolution and parsing
const {
    parse
} = require('querystring'); //querystring provides utilities for parsing and formatting URL query strings

http.createServer(function (request, response) { //creates an HTTP Server object
    let url = request.url;
    let filePath = 'index.html';
    let pathName = urlParse.parse(url, true).pathname; //url = url to parse, true = return an object
    
    if (pathName === '/'){
        fs.readFile(filePath, function (error, content) { // use the fs package to read the file index.html from the local drive
            response.writeHead(200);
            response.write(content);
            response.end();
        });
    }
    else if (pathName === '/login'){
        if (request.method === 'POST') {
            let body = '';
            request.on('data', function(chunk){ //on binds an event to a object
                body += chunk.toString(); //convert buffer to string
            });
            request.on('end', function(){
                let items = parse(body); // convert the data into an object
                let username = items.username;
                let password = items.password;

                if (username === 'admin' && password === 'pass'){
                    filePath = 'mainpage.html';
                } else{
                    filePath = 'accessdenied.html';
                }
                fs.readFile(filePath, function (error, content) {
                    response.writeHead(200);
                    response.write(content);
                    response.end(); 
                });
            });
        } 
        else{
            response.writeHead(404); 
            response.end();
        }     
    }
    else{
        response.writeHead(404); 
        response.end();
    }
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
    