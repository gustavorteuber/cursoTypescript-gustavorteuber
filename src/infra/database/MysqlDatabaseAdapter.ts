import { type IDatabase } from './iDatabase';
import mysql from 'mysql2/promise';
import { envDbConstants } from '../constants/envConstants';

export class MysqlDatabaseAdapter implements IDatabase {
  private pool?: any;
  private connection?: any;
  private readonly debug: boolean;

  constructor () {
    this.debug = false;
  }

  async connect (): Promise<void> {
    const databaseConfig: mysql.PoolOptions = {
      ...envDbConstants,
      namedPlaceholders: true,
      waitForConnections: true,
      connectionLimit: 10,
      dateStrings: true,
      queueLimit: 0
    };

    try {
      this.pool = mysql.createPool(databaseConfig);
      this.connection = await this.pool.getConnection();
      console.log('Database Connect!');
    } catch (error: any | undefined) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`Database connection error: ${error}`);
    }
  }

  async disconnect (): Promise<any> {
    if (this.connection != null) {
      await this.connection.end();
    }
  }

  async query (sql: string, params?: Record<string, any>): Promise<any> {
    if (this.connection != null) {
      if (params === undefined) {
        const [rows] = await this.connection.execute(sql);
        const queryWithValues = mysql.format(sql);
        return rows;
      } else {
        const [rows] = await this.connection.execute(sql, params);
        const queryWithValues = mysql.format(sql, params);
        return rows;
      }
    }
}
}