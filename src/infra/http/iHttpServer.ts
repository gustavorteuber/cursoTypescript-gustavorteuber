export interface IHttpServer {
    on: (method: string, url: string, callback: (req: any, res: any, next: any) => void) => void;
    listen: (port: number) => void;
    close: () => void;
}