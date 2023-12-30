import { type Response } from "express";
import { IHttpResponse } from "./iHttpResponse";

export default class HttpResponseAdapter implements IHttpResponse {
    constructor(readonly res: Response) {}

    send(data: any): void {
        this.res.send(data);
    }

    json(data: any): void {
        this.res.json(data);
    }

    status(code: number): any {
        return this.res.status(code);
    }
}