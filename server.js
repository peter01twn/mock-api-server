import jsonServer from 'json-server';
import multer from 'multer';
import https from 'https';
import fs from 'fs';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(multer().none());

server.get('/user', (req, res) => {
    res.statusCode = 403;
    res.json('asdasd');
});

router.render = (req, res) => {
    const ststus = res.statusCode;
    if (ststus === 404) {
        res.json({
            success: false,
            msg: 'api not found',
        });
    } else if (ststus === 500) {
        res.json({
            success: false,
            msg: 'server error',
        });
    } else {
        res.json({
            success: true,
            data: res.locals.data,
        });
    }
};
server.use(router);

const options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
};
const port = process.env.PORT || 3000;
https.createServer(options, server).listen(port, () => {
    console.log(port);
});
