/**
 * Database configuration
 *
 * @export
 * @interface IDataBaseConfig
 */
export interface IDataBaseConfig {
  /**
   * MongoDb database url. Could be useful with MongoDb.
   *
   * @type {string}
   * @memberof IDataBaseConfig
   */
  mongoUrl: string;

  /**
   * PostgresSQL database url. Could be useful with PostgresSQL.
   *
   * @type {string}
   * @memberof IDataBaseConfig
   */
  postgresUrl: string;
}
