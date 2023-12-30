import { type Request } from "express";
import { IHttpRequest } from "./iHttpRequest";

export default class ExpressRequestHttp implements IHttpRequest {
  constructor(readonly req: Request) {}

    get body(): any {
        return this.req.body;
    }
    get headers(): any {
        return this.req.headers;
    }
}