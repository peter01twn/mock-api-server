import jsonServer from 'json-server';
import multer from 'multer';
import { get } from './aws-s3.js';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(multer().none());

server.get('/user', (req, res) => {
    res.json('asdasd');
});

server.get('/static', (req, res) => {
    get({Key: 'test.txt'})
        .then(data => {
            res.body = data.Body;
            res.end();
        });
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

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(port);
});
