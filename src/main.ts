//ACOPLADO

// import express from 'express';

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(3000, () => {
//     console.log('O server iniciou na porta 3000')
// });


// DESACOPLADO

import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./controllers/httpController";
import { MysqlDatabaseAdapter } from "./infra/database/MysqlDatabaseAdapter";

export class App {
    readonly httpServer = new ExpressAdapter;
    private readonly database = new MysqlDatabaseAdapter;
    readonly httpController = new HttpController(this.httpServer);

    constructor() {
        this.database = new MysqlDatabaseAdapter();
    }

    async start(): Promise<void> {
        await this.database.connect();
    }

    async stop (): Promise<void> {
        this.httpServer.close();
        await this.database.disconnect();
    }   
}

const app = new App();
app.start().catch((error) => {
    console.log('Um ou mais serviços nao se conectaram')
});