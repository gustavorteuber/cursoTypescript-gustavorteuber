import express, {type Request, type Response, type NextFunction} from 'express';
import { type IHttpServer } from './iHttpServer';

export default class ExpressAdapter implements IHttpServer {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }
    on (method: string, url: string, callback: (req: Request, res: Response, next: NextFunction) => void) {
        this.app[method](url, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const output = await callback(req, res, next);
                res.json(output);
            } catch (error: any) {   
                next(error);
            }
        });
    }

    listen (port: number) {
        this.app.listen(port)
        console.log(`O server iniciou na porta: ${port}`)
    }

    close(): void {
        const server = this.app.listen();
        server.close();
    }
}