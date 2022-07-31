const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = class Connection {
  static db = null;
  static async getDB() {
    if (this.db === null) {
      const mongoUri = process.env.MONGODB_URI;
      const mongoDbName = process.env.MONGODB_DB;
      var mongoClient = await MongoClient.connect(mongoUri);
      this.db = mongoClient.db(mongoDbName);
      console.log('Conexión:', 'Creando Conexión');
    } else {
      console.log('Conexión:', 'Usando Conexión Cacheada');
    }
    return this.db;
    
  }
}
