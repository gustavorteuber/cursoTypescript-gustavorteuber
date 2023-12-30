export interface IDatabase {
    connect: () => Promise<any>
    disconnect: () => Promise<void>
    query: (sql: string, params?: any) => Promise<any>
}