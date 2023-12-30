import * as dotenv from 'dotenv'
dotenv.config()

export class envDbConstants {
    static host: string | undefined = process.env.HOST
    static password: string | undefined = process.env.PASSWORD
    static database: string | undefined = process.env.DATABASE
    static user: string | undefined = process.env.DBUSER
}