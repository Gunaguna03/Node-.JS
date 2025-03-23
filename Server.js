const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('C:', 'Users', 'User', 'Desktop', 'movies'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

const uploadForm = `
<html>
<head>
    <title>File Upload</title>
</head>
<body>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="file"/>
        <button type="submit">Upload</button>
    </form>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(uploadForm);
    } 
    else if (req.method === 'POST' && req.url === '/upload') {
        upload.single('file')(req, res, (err) => {
            if (err) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Error uploading file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File uploaded successfully');
        });
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
