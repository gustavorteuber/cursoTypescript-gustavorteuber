import { IHttpRequest } from "../infra/http/iHttpRequest";
import { IHttpResponse } from "../infra/http/iHttpResponse";
import { IHttpServer } from "../infra/http/iHttpServer";

export default class HttpController {
    constructor(readonly httpServer: IHttpServer) {

        httpServer.on('get', '/', async (req: IHttpRequest, res: IHttpResponse, next) => {
            res.send('Hello World!');
        });
    }
}