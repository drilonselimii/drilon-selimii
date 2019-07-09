var mysql = require('mysql2/promise');

let conn = null;

class SqlProvider {
  static async getConnection() {
    const config = { host: 'remotemysql.com', port: "3306", user: 'NtSOPMfRQ0', password: 'hU9yajeMWN', database: 'NtSOPMfRQ0' };

    if (conn) {
      return conn
    }

    conn = await mysql.createConnection(config);

    return conn;
  }
}

module.exports = SqlProvider;