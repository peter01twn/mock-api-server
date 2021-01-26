import jsonServer from 'json-server';
import multer from 'multer';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

import https from 'https';
import fs from 'fs';
const options = {
    key: fs.readFileSync('./server-key.pem'),
    ca: [fs.readFileSync('./cert.pem')],
    cert: fs.readFileSync('./server-cert.pem'),
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(multer().none());

// router.render = (req, res) => {
//     res.status(404).json({
//         success: false,
//         msg: 'api not found',
//     });
// };
server.use(router);

const port = process.env.PORT || 3000;
https.createServer(options, server).listen(port, () => {
    console.log(port);
});
