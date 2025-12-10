const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Serve CSS and HTML files
function serveFile(res, folder, fileName, contentType) {
    const filePath = path.join(__dirname, folder, fileName);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("<h1>404 File Not Found</h1>");
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {

    // Serve CSS
    if (req.url === "/styles.css") {
        return serveFile(res, "public", "styles.css", "text/css");
    }

    // Serve HTML pages
    if (req.url === "/" || req.url === "/home") {
        return serveFile(res, "pages", "index.html", "text/html");
    } 
    
    if (req.url === "/about") {
        return serveFile(res, "pages", "about.html", "text/html");
    }

    if (req.url === "/services") {
        return serveFile(res, "pages", "services.html", "text/html");
    }

    // Default 404
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Route Not Found</h1>");
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
