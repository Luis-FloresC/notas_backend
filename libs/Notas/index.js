const DaoObject = require('../../dao/mongoDb/DaoObjetos');
module.exports = class Notas {
  NotasDao = null;

  constructor ( NotasDao = null) {
    if (!(NotasDao instanceof DaoObject)) {
     throw new Error('Se requiere una instancia de objeto DAO...');
    }
    this.NotasDao = NotasDao;
  }

  async init(){
    await this.NotasDao.init();
    await this.NotasDao.setup();
  }

  async getNotesVersion () {
    return {
      entity: 'Notas',
      version: '1.0.0',
      description: 'CRUD de Notas'
    };
  }

  async addNote ({
    title="Nueva Nota", description="...", keyword, idUser 
  }) {
    const result =  await this.NotasDao.insertOne(
      {
        title, description, keyword, idUser 
      }
    );
    return {
        id: result.lastID,title, description, keyword, idUser ,"mensaje": "Nota guardada"
    };
  };

  async getNotes () {
    return this.NotasDao.getAll();
  }

  async getNoteById ({ codigo }) {
    return this.NotasDao.getById({codigo});
  }

  async getNoteByUser ({ codigo }) {
    return this.NotasDao.getNotesByUser({ codigo});
  }

  async updateNote ({ title, description, keyword, idUser, codigo  }) {
    const result = await this.NotasDao.updateOne({ title, description, keyword, idUser, codigo  });
    return {
      id: codigo,
      title, description, keyword, idUser,
      modified: result.changes,
      "mensaje": "Nota actualizada"
    }
  }

  async getPagedNotes(idUser, page=1, limit=20) {
    return this.NotasDao.getAllPaged({idUser, page, pageLimit:limit});
  }

  async deleteNote({ codigo }) {
    const noteToDelete = await this.NotasDao.getById({codigo});
    const result = await this.NotasDao.deleteOne({ codigo });
    return {
      ...noteToDelete,
      deleted: result.changes,
      "mensaje": "Nota eliminada"
    };
  }

  async getNoteByUserPages({pagina, elementosPorPagina, id }){
    const result = await this.NotasDao.getNotesUserForPages({pagina, elementosPorPagina, id});
    return result;
  }
}