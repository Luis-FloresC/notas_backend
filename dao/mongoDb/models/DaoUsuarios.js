const { db } = require('../Conexion');
const DaoObject = require('../DaoObjetos');
module.exports = class DaoUsuarios extends DaoObject {
  constructor(db = null) {
    super(db, 'Usuarios');
  }
  async setup() {
    if (process.env.MONGODB_SETUP) {
     const indexExists = await this.collection.indexExists('email_1');
     if (!indexExists) {
      await this.collection.createIndex({email:1}, {unique:true});
     }
    }
  }

  getAll() {
    return this.find();
  }

  getById({ codigo }) {
    return this.findById(codigo);
  }

  getByEmail({ email }) {
    return this.findOne({email});
  }

  insertOne({ email, password, nombre, avatar, estado }) {
    const newUser = {
      email,
      password,
      nombre,
      avatar,
      estado,
      created: new Date().toISOString(),
    }
    return super.insertOne(newUser);
  }

  updateOne({ codigo, password, nombre, avatar, estado }) {
    const updateCommand = {
      "$set": {
        nombre,
        password,
        avatar,
        estado,
        updated: new Date().toISOString()
      }
    }
    return super.updateOne(codigo, updateCommand);
  }

  updatePassword({ codigo, password, resetToken }) {
    const updateCommand = {
      "$set": {
        password, resetToken,
        updated: new Date().toISOString()
      }
    }
    return super.updateOne(codigo, updateCommand);
  }



  deleteOne({ codigo }) {
    const updateCommand = {
      "$set": {
        estado:'INA',
        updated: new Date().toISOString()
      }
    }
    return super.updateOne(codigo, updateCommand);
  }

}
