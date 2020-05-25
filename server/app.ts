import * as express from 'express';
import database from './db';
import controller from './controller';
import * as bodyparser from 'body-parser';

class App {
    public app: express.Application;
    private database: database;
    private controller: controller;

    constructor() {
        this.app = express();
        this.middleware();
        this.controller = new controller();
        this.database = new database();
        this.database.createConnection();
        this.routes();
    }

    middleware() {
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({ extended: true }));
    }

    routes() {
        this.app.route('/').get((req, res) => res.status(200).json({ rest: 'hello world' }));
        this.app.route('/api/users').get((req, res) => this.controller.select(req, res));
        this.app.route('/api/users/:id').get((req, res) => this.controller.selectOne(req, res));
        this.app.route('/api/users').post((req, res) => this.controller.insert(req, res));
        this.app.route('/api/users/:id').delete((req, res) => this.controller.delete(req, res));
        this.app.route('/api/users/:id').put((req, res) => this.controller.update(req, res));
    }
}

export default new App();
