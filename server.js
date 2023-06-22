var http = require('http');
var fs = require('fs');

const PORT = 8080;

fs.watchFile('./yoprettyboy-email.html', function (curr, prev) {
    console.log('File changed, reloading...');
    fs.readFile('./yoprettyboy-email.html', function (err, html) {
        if (err) throw err;

        // Close the previous server instance
        if (httpServer) {
            httpServer.close();
        }

        // Create a new server instance
        httpServer = http.createServer(function (request, response) {
            response.writeHeader(200, { "Content-Type": "text/html" });
            response.write(html);
            response.end();
        });

        // Start the server
        httpServer.listen(PORT, function () {
            console.log('Server running at http://localhost:' + PORT);
        });
    });
});

var httpServer = http.createServer(function (request, response) {
    fs.readFile('./yoprettyboy-email.html', function (err, html) {
        if (err) throw err;
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
    });
});

httpServer.listen(PORT, function () {
    console.log('Server running at http://localhost:' + PORT);
});