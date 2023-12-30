export interface IHttpResponse {
    send: (data: any) => void
    json: (data: any) => void
    status: (code: number) => any
}